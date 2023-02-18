import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  surrName: string;
  @Prop()
  phone: number;
  @Prop()
  delivery: boolean;
  @Prop()
  address: string;
  @Prop()
  status: boolean;
  @Prop()
  paymentMethod: boolean;
  @Prop()
  deliveryTime: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
