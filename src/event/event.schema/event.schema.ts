import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop()
  imagePath: string;
  @Prop()
  title: string;
  @Prop()
  body: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
