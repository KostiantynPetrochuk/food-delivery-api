import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { FoodModel } from "./food.model/food.model";
import { CreateFoodDto } from "./dto/create-food.to";

@Controller("food")
export class FoodController {
  @Post("create")
  async create(@Body() dto: CreateFoodDto) {}

  @Get()
  async findAll() {}

  @Get(":id")
  async findById(@Param("id") id: number) {}

  @Patch(":id")
  async updateById(@Param("id") id: number, @Body() dto: FoodModel) {}

  @Delete(":id")
  async delete(@Param("id") id: number) {}
}
