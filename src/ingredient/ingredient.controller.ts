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
import { Ingredient } from "./ingredient.schema/ingredient.schema";
import { CreateIngredientDto } from "./dto/create-ingredient.dto";
import { IngredientService } from "./ingredient.service";
import { IdValidationPipe } from "../pipes/id-validation.pipe";

@Controller("ingredient")
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @UsePipes(new ValidationPipe())
  @Post("create")
  async create(@Body() dto: CreateIngredientDto) {
    return this.ingredientService.create(dto);
  }

  @Get(":id")
  async findById(@Param("id", IdValidationPipe) id: string) {
    return this.ingredientService.findById(id);
  }

  @Get()
  async findAll() {
    return this.ingredientService.findAll();
  }

  @Patch(":id")
  async updateById(@Param("id", IdValidationPipe) id: string, @Body() dto: CreateIngredientDto) {
    return this.ingredientService.updateById(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id", IdValidationPipe) id: string) {
    return this.ingredientService.delete(id);
  }
}
