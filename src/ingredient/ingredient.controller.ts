import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { IngredientModel } from "./ingredient.model/ingredient.model";
import { CreateIngredientDto } from "./dto/create-ingredient.dto";

@Controller("ingredient")
export class IngredientController {
  @Post("create")
  async create(@Body() dto: CreateIngredientDto) {}

  @Get()
  async findAll() {}

  @Get(":id")
  async findById(@Param("id") id: number) {}

  @Patch(":id")
  async updateById(@Param("id") id: number, @Body() dto: IngredientModel) {}

  @Delete(":id")
  async delete(@Param("id") id: number) {}

  @Post("findByIds")
  async findByIds(@Body() ids: number[]) {}
}
