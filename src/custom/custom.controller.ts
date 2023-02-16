import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateCustomDto } from "./dto/create-custom.dto";
import { CustomModel } from "./custom.model/custom.model";

@Controller("custom")
export class CustomController {
  @Post("create")
  async create(@Body() dto: CreateCustomDto) {}

  @Get()
  async findAll() {}

  @Get(":id")
  async findById(@Param("id") id: number) {}

  @Patch(":id")
  async updateById(@Param("id") id: number, @Body() dto: CustomModel) {}

  @Delete(":id")
  async delete(@Param("id") id: number) {}
}
