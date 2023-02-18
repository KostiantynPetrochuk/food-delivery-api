import { Controller, Post, Get, Patch, Delete, Body, Param } from "@nestjs/common";
import { Dish } from "./dish.schema/dish.schema";
import { DishService } from "./dish.service";
import { CreateDishDto } from "./dto/create-dish.dto";

@Controller("dish")
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post("create")
  async create(@Body() dto: CreateDishDto) {
    return this.dishService.create(dto);
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.dishService.findById(id);
  }

  @Get()
  async findAll() {
    return this.dishService.findAll();
  }

  @Patch(":id")
  async updateById(@Param("id") id: string, @Body() dto: Dish) {
    return this.dishService.updateById(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.dishService.delete(id);
  }
}
