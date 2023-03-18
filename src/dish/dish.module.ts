import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DishController } from "./dish.controller";
import { Dish, DishSchema } from "./dish.schema/dish.schema";
import { Ingredient, IngredientSchema } from "../ingredient/ingredient.schema/ingredient.schema";
import { DishService } from "./dish.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dish.name, schema: DishSchema },
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  controllers: [DishController],
  providers: [DishService],
})
export class DishModule {}
