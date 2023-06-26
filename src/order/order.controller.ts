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
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderService } from "./order.service";
import { IdValidationPipe } from "../pipes/id-validation.pipe";
import { TelegramService } from "src/telegram/telegram.service";
import { CreateCustomDto } from "src/custom/dto/create-custom.dto";

@Controller("order")
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly telegramService: TelegramService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post("create")
  async create(@Body() data: { dto: CreateOrderDto; dtos: Omit<CreateCustomDto, "order">[] }) {
    return this.orderService.create(data.dto, data.dtos);
  }

  @UsePipes(new ValidationPipe())
  @Post("notify")
  async notify(@Body() dto: CreateOrderDto) {
    const message =
      `Ім'я: ${dto.firstName}\n` +
      `Прізвище: ${dto.lastName}\n` +
      `По батькові: ${dto.surrName}\n` +
      `Телефон: ${dto.phone}\n` +
      `Доставка: ${dto.delivery}\n` +
      `Адреса: ${dto.address}\n` +
      `Статус: ${dto.status}\n` +
      `Оплата: ${dto.paymentMethod}\n` +
      `Час доставки: ${dto.deliveryTime}\n`;
    return this.telegramService.sendMessage(message);
  }

  @Get(":id")
  async findById(@Param("id", IdValidationPipe) id: string) {
    return this.orderService.findById(id);
  }

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @Patch(":id")
  async updateById(@Param("id", IdValidationPipe) id: string, @Body() dto: CreateOrderDto) {
    return this.orderService.updateById(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id", IdValidationPipe) id: string) {
    return this.orderService.delete(id);
  }
}
