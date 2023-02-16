import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { EventModel } from "./event.model/event.model";
import { CreateEventDto } from "./dto/create-event-dto";

@Controller("event")
export class EventController {
  @Post("create")
  async create(@Body() dto: CreateEventDto) {}

  @Get()
  async findAll() {}

  @Get(":id")
  async findById(@Param("id") id: number) {}

  @Patch(":id")
  async updateById(@Param("id") id: number, @Body() dto: EventModel) {}

  @Delete(":id")
  async delete(@Param("id") id: number) {}
}
