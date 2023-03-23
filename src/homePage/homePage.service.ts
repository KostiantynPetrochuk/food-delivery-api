import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { Dish, DishDocument } from "../dish/dish.schema/dish.schema";
import { Event, EventDocument } from "src/event/event.schema/event.schema";

@Injectable()
export class HomePageService {
  constructor(
    @InjectModel(Dish.name) private dishModel: Model<DishDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async getHomeDishesAndEvents(): Promise<{
    novelties: Dish[];
    ramens: Dish[];
    pizzas: Dish[];
    latestEvents: Event[];
  }> {
    const novelties = await this.dishModel
      .find({ isNovelty: true })
      .sort({ _id: -1 })
      .limit(4)
      .exec();

    const ramens = await this.dishModel
      .aggregate([
        {
          $match: {
            dishCategory: { $eq: new ObjectId("63f3d0c024e1d071ed3d074b") },
          },
        },
        { $sample: { size: 4 } },
      ])
      .exec();

    const pizzas = await this.dishModel
      .aggregate([
        {
          $match: {
            dishCategory: { $eq: new ObjectId("63f3d0cf24e1d071ed3d074f") },
          },
        },
        { $sample: { size: 4 } },
      ])
      .exec();

    const latestEvents = await this.eventModel.find().sort({ _id: -1 }).limit(4).exec();

    return { novelties, ramens, pizzas, latestEvents };
  }
}
