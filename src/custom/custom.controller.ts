import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateCustomDto } from "./dto/create-custom.dto";
import { Custom } from "./custom.schema/custom.schema";
import { CustomService } from "./custom.service";

@Controller("custom")
export class CustomController {
  constructor(private readonly customService: CustomService) {}

  @Post("create")
  async create(@Body() dto: CreateCustomDto) {
    return this.customService.create(dto);
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.customService.findById(id);
  }

  @Get()
  async findAll() {
    return this.customService.findAll();
  }

  @Patch(":id")
  async updateById(@Param("id") id: string, @Body() dto: Custom) {
    return this.customService.updateById(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.customService.delete(id);
  }
}
