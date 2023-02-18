import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DishController } from "./dish.controller";
import { Dish, DishSchema } from "./dish.schema/dish.schema";
import { DishService } from "./dish.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }])],
  controllers: [DishController],
  providers: [DishService],
})
export class DishModule {}
