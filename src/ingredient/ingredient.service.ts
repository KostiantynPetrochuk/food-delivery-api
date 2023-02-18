import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { CreateIngredientDto } from "./dto/create-ingredient.dto";
import { Ingredient, IngredientDocument } from "./ingredient.schema/ingredient.schema";

@Injectable()
export class IngredientService {
  constructor(@InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>) {}

  async create(dto: CreateIngredientDto): Promise<Ingredient> {
    return this.ingredientModel.create(dto);
  }

  async findById(id: string) {
    return this.ingredientModel.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "dishes",
          localField: "dish",
          foreignField: "_id",
          as: "dish",
        },
      },
      {
        $lookup: {
          from: "foods",
          localField: "food",
          foreignField: "_id",
          as: "food",
        },
      },
    ]);
  }

  async findAll() {
    return this.ingredientModel.aggregate([
      {
        $lookup: {
          from: "dishes",
          localField: "dish",
          foreignField: "_id",
          as: "dish",
        },
      },
      {
        $lookup: {
          from: "foods",
          localField: "food",
          foreignField: "_id",
          as: "food",
        },
      },
    ]);
  }

  async updateById(id: string, dto: Ingredient) {
    return this.ingredientModel.findOneAndUpdate(new ObjectId(id), dto, { new: true }).exec();
  }

  async delete(id: string) {
    return this.ingredientModel.findByIdAndDelete(id).exec();
  }
}
