import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DishCategoryDocument = HydratedDocument<DishCategory>;

@Schema()
export class DishCategory {
  @Prop()
  name: string;
}

export const DishCategorySchema = SchemaFactory.createForClass(DishCategory);
