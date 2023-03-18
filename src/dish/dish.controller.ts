import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { DishService } from "./dish.service";
import { CreateDishDto } from "./dto/create-dish.dto";
import { IdValidationPipe } from "../pipes/id-validation.pipe";

@Controller("dish")
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @UsePipes(new ValidationPipe())
  @Post("create")
  async create(@Body() dto: CreateDishDto) {
    return this.dishService.create(dto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findById(@Param("id", IdValidationPipe) id: string) {
    return this.dishService.findById(id);
  }

  @Get("byDishCategory/:id")
  async findAllByDishCategory(@Param("id", IdValidationPipe) id: string) {
    return this.dishService.findAllByDishCategory(id);
  }

  @Get()
  async findAll() {
    return this.dishService.findAll();
  }

  @Patch(":id")
  async updateById(@Param("id", IdValidationPipe) id: string, @Body() dto: CreateDishDto) {
    return this.dishService.updateById(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id", IdValidationPipe) id: string) {
    return this.dishService.delete(id);
  }
}
