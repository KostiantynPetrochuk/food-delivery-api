import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventController } from "./event.controller";
import { EventSchema, Event } from "./event.schema/event.schema";
import { EventService } from "./event.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
