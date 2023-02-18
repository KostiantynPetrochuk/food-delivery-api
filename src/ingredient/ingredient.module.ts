import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { IngredientController } from "./ingredient.controller";
import { Ingredient, IngredientSchema } from "./ingredient.schema/ingredient.schema";
import { IngredientService } from "./ingredient.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Ingredient.name, schema: IngredientSchema }])],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}
