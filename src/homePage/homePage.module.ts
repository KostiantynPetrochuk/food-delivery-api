import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HomePageController } from "./homePage.controller";
import { Dish, DishSchema } from "../dish/dish.schema/dish.schema";
import { Event, EventSchema } from "../event/event.schema/event.schema";
import { Ingredient, IngredientSchema } from "../ingredient/ingredient.schema/ingredient.schema";
import { HomePageService } from "./homePage.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dish.name, schema: DishSchema },
      { name: Event.name, schema: EventSchema },
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  controllers: [HomePageController],
  providers: [HomePageService],
})
export class HomePageModule {}
