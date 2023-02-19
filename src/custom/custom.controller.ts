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
import { CreateCustomDto } from "./dto/create-custom.dto";
import { Custom } from "./custom.schema/custom.schema";
import { CustomService } from "./custom.service";
import { IdValidationPipe } from "../pipes/id-validation.pipe";

@Controller("custom")
export class CustomController {
  constructor(private readonly customService: CustomService) {}

  @UsePipes(new ValidationPipe())
  @Post("create")
  async create(@Body() dto: CreateCustomDto) {
    return this.customService.create(dto);
  }

  @Get(":id")
  async findById(@Param("id", IdValidationPipe) id: string) {
    return this.customService.findById(id);
  }

  @Get()
  async findAll() {
    return this.customService.findAll();
  }

  @Patch(":id")
  async updateById(@Param("id", IdValidationPipe) id: string, @Body() dto: CreateCustomDto) {
    return this.customService.updateById(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id", IdValidationPipe) id: string) {
    return this.customService.delete(id);
  }
}
