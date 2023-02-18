import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Dish } from "../../dish/dish.schema/dish.schema";
import { Food } from "../../food/food.schema/food.schema";

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema()
export class Ingredient {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Food" })
  food: Food;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Dish" })
  dish: Dish;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
