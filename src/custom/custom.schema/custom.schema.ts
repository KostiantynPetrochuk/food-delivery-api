import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Dish } from "../../dish/dish.schema/dish.schema";
import { Order } from "../../order/order.schema/order.schema";

export type CustomDocument = HydratedDocument<Custom>;

@Schema()
export class Custom {
  @Prop()
  count: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Dish" })
  dish: Dish;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Order" })
  order: Order;
}

export const CustomSchema = SchemaFactory.createForClass(Custom);
