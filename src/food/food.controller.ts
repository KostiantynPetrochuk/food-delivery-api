import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Food } from "./food.schema/food.schema";
import { CreateFoodDto } from "./dto/create-food.to";
import { FoodService } from "./food.service";
import { IdValidationPipe } from "../pipes/id-validation.pipe";

@Controller("food")
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @UsePipes(new ValidationPipe())
  @Post("create")
  async create(@Body() dto: CreateFoodDto) {
    return this.foodService.create(dto);
  }

  @Get(":id")
  async findById(@Param("id", IdValidationPipe) id: string) {
    return this.foodService.findById(id);
  }

  @Get()
  async findAll() {
    return this.foodService.findAll();
  }

  @Patch(":id")
  async updateById(@Param("id", IdValidationPipe) id: string, @Body() dto: CreateFoodDto) {
    return this.foodService.updateById(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id", IdValidationPipe) id: string) {
    return this.foodService.delete(id);
  }
}
