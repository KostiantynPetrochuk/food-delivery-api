import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { DishCategory } from "../../dish-category/dish-category.schema/dish-category.schema";

export type DishDocument = HydratedDocument<Dish>;

@Schema()
export class Dish {
  @Prop()
  name: string;
  @Prop()
  slug: string;
  @Prop()
  imagePath: string;
  @Prop()
  weight: number;
  @Prop()
  price: number;
  @Prop()
  isNovelty: boolean;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "DishCategory" })
  dishCategory: DishCategory;
}

export const DishSchema = SchemaFactory.createForClass(Dish);
