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
import { DishCategory } from "./dish-category.schema/dish-category.schema";
import { DishCategoryService } from "./dish-category.service";
import { CreateDishCategoryDto } from "./dto/create-dish-category.dto";

@Controller("dish-category")
export class DishCategoryController {
  constructor(private readonly dishCategoryService: DishCategoryService) {}

  @UsePipes(new ValidationPipe())
  @Post("create")
  async create(@Body() dto: CreateDishCategoryDto) {
    return this.dishCategoryService.create(dto);
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.dishCategoryService.findById(id);
  }

  @Get()
  async findAll() {
    return this.dishCategoryService.findAll();
  }

  @Patch(":id")
  async updateById(@Param("id") id: string, @Body() dto: DishCategory) {
    return this.dishCategoryService.updateById(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.dishCategoryService.delete(id);
  }
}
