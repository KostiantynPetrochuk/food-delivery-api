import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DishCategoryController } from "./dish-category.controller";
import { DishCategory, DishCategorySchema } from "./dish-category.schema/dish-category.schema";
import { DishCategoryService } from "./dish-category.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: DishCategory.name, schema: DishCategorySchema }])],
  controllers: [DishCategoryController],
  providers: [DishCategoryService],
})
export class DishCategoryModule {}
