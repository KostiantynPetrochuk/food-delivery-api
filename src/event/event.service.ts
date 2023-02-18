import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { CreateEventDto } from "./dto/create-event-dto";
import { Event, EventDocument } from "./event.schema/event.schema";

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

  async create(dto: CreateEventDto): Promise<Event> {
    return this.eventModel.create(dto);
  }

  async findById(id: string) {
    return this.eventModel.findById(id);
  }

  async findAll() {
    return this.eventModel.find();
  }

  async updateById(id: string, dto: CreateEventDto) {
    return this.eventModel.findOneAndUpdate(new ObjectId(id), dto, { new: true }).exec();
  }

  async delete(id: string) {
    return this.eventModel.findByIdAndDelete(id).exec();
  }
}
