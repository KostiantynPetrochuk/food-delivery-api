import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { Dish, DishDocument } from "./dish.schema/dish.schema";
import { Ingredient, IngredientDocument } from "../ingredient/ingredient.schema/ingredient.schema";
import { CreateDishDto } from "./dto/create-dish.dto";

@Injectable()
export class DishService {
  constructor(
    @InjectModel(Dish.name) private dishModel: Model<DishDocument>,
    @InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>,
  ) {}

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

  async findAllByDishCategory(id: string) {
    const dishes = await this.dishModel
      .find({ dishCategory: id })
      .populate("dishCategory", "name")
      .exec();

    const dishIds = dishes.map((dish) => dish._id);

    const ingredients = await this.ingredientModel
      .find({ dish: { $in: dishIds } })
      .populate("food", "name")
      .exec();

    const dishesWithIngredients = dishes.map((dish) => {
      const dishIngredients = ingredients
        .filter((ingredient) => ingredient.dish.toString() === dish._id.toString())
        .map((ingredient) => ingredient.food.name);

      return { ...dish.toObject(), ingredients: dishIngredients };
    });

    return dishesWithIngredients;
  }

  async updateById(id: string, dto: CreateDishDto) {
    return this.dishModel.findOneAndUpdate(new ObjectId(id), dto, { new: true }).exec();
  }

  async delete(id: string) {
    return this.dishModel.findByIdAndDelete(id).exec();
  }
}
