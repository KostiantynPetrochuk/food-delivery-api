import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { DishCategoryModel } from "./dish-category.model/dish-category.model";
import { CreateDishCategoryDto } from "./dto/create-dish-category.dto";

@Controller("dish-category")
export class DishCategoryController {
  @Post("create")
  async create(@Body() dto: CreateDishCategoryDto) {}

  @Get(":id")
  async findById(@Param("id") id: number) {}

  @Get()
  async findAll() {}

  @Patch(":id")
  async updateById(@Param("id") id: number, @Body() dto: DishCategoryModel) {}

  @Delete(":id")
  async delete(@Param("id") id: number) {}
}
