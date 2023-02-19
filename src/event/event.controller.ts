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
import { Event } from "./event.schema/event.schema";
import { CreateEventDto } from "./dto/create-event-dto";
import { EventService } from "./event.service";
import { IdValidationPipe } from "../pipes/id-validation.pipe";

@Controller("event")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UsePipes(new ValidationPipe())
  @Post("create")
  async create(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto);
  }

  @Get(":id")
  async findById(@Param("id", IdValidationPipe) id: string) {
    return this.eventService.findById(id);
  }

  @Get()
  async findAll() {
    return this.eventService.findAll();
  }

  @Patch(":id")
  async updateById(@Param("id", IdValidationPipe) id: string, @Body() dto: CreateEventDto) {
    return this.eventService.updateById(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id", IdValidationPipe) id: string) {
    return this.eventService.delete(id);
  }
}
