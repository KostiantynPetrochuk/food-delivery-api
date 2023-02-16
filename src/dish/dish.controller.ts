import { Controller, Post, Get, Patch, Delete, Body, Param } from "@nestjs/common";
import { DishModel } from "./dish.model/dish.model";
import { CreateDishDto } from "./dto/create-dish.dto";

@Controller("dish")
export class DishController {
  @Post("create")
  async create(@Body() dto: CreateDishDto) {}

  @Get()
  async findAll() {}

  @Get(":id")
  async findById(@Param("id") id: number) {}

  @Patch(":id")
  async updateById(@Param("id") id: number, @Body() dto: DishModel) {}

  @Delete(":id")
  async delete(@Param("id") id: number) {}
}
