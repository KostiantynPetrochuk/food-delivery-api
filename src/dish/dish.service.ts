import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { Dish, DishDocument } from "./dish.schema/dish.schema";
import { CreateDishDto } from "./dto/create-dish.dto";

@Injectable()
export class DishService {
  constructor(@InjectModel(Dish.name) private dishModel: Model<DishDocument>) {}

  async create(dto: CreateDishDto): Promise<Dish> {
    return this.dishModel.create(dto);
  }

  async findById(id: string) {
    return this.dishModel.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "dishcategories",
          localField: "dishCategory",
          foreignField: "_id",
          as: "dishCategory",
        },
      },
    ]);
  }

  async findAll() {
    return this.dishModel.aggregate([
      {
        $lookup: {
          from: "dishcategories",
          localField: "dishCategory",
          foreignField: "_id",
          as: "dishCategory",
        },
      },
    ]);
  }

  async updateById(id: string, dto: CreateDishDto) {
    return this.dishModel.findOneAndUpdate(new ObjectId(id), dto, { new: true }).exec();
  }

  async delete(id: string) {
    return this.dishModel.findByIdAndDelete(id).exec();
  }
}
