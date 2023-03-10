import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TelegramModule } from "src/telegram/telegram.module";
import { OrderController } from "./order.controller";
import { Order, OrderSchema } from "./order.schema/order.schema";
import { OrderService } from "./order.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), TelegramModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
