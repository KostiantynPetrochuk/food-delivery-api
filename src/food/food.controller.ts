import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Food } from "./food.schema/food.schema";
import { CreateFoodDto } from "./dto/create-food.to";
import { FoodService } from "./food.service";

@Controller("food")
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post("create")
  async create(@Body() dto: CreateFoodDto) {
    return this.foodService.create(dto);
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.foodService.findById(id);
  }

  @Get()
  async findAll() {
    return this.foodService.findAll();
  }

  @Patch(":id")
  async updateById(@Param("id") id: string, @Body() dto: Food) {
    return this.foodService.updateById(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.foodService.delete(id);
  }
}
