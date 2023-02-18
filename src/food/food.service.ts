import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { CreateFoodDto } from "./dto/create-food.to";
import { Food, FoodDocument } from "./food.schema/food.schema";

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) {}

  async create(dto: CreateFoodDto): Promise<Food> {
    return this.foodModel.create(dto);
  }

  async findById(id: string) {
    return this.foodModel.findById(id);
  }

  async findAll() {
    return this.foodModel.find();
  }

  async updateById(id: string, dto: CreateFoodDto) {
    return this.foodModel.findOneAndUpdate(new ObjectId(id), dto, { new: true }).exec();
  }

  async delete(id: string) {
    return this.foodModel.findByIdAndDelete(id).exec();
  }
}
