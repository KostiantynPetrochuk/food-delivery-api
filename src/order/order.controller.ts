import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { OrderModel } from "./order.model/order.model";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller("order")
export class OrderController {
  @Post("create")
  async create(@Body() dto: CreateOrderDto) {}

  @Get()
  async findAll() {}

  @Get(":id")
  async findById(@Param("id") id: number) {}

  @Patch(":id")
  async updateById(@Param("id") id: number, @Body() dto: OrderModel) {}

  @Delete(":id")
  async delete(@Param("id") id: number) {}
}
