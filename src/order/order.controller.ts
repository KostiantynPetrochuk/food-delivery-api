import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Order } from "./order.schema/order.schema";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderService } from "./order.service";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UsePipes(new ValidationPipe())
  @Post("create")
  async create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.orderService.findById(id);
  }

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @Patch(":id")
  async updateById(@Param("id") id: string, @Body() dto: Order) {
    return this.orderService.updateById(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.orderService.delete(id);
  }
}
