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
    const dish = await this.dishModel.findOne({ _id: new ObjectId(id) });
    const ingredients = await this.ingredientModel
      .find({ dish: dish._id })
      .populate("food", "name");
    return {
      ...dish.toObject(),
      ingredients: ingredients.map((ingredient) => ingredient.food.name),
    };
  }

  async findBySlug(slug: string) {
    const dish = await this.dishModel.findOne({ slug });
    const ingredients = await this.ingredientModel
      .find({ dish: dish._id })
      .populate("food", "name");
    return {
      ...dish.toObject(),
      ingredients: ingredients.map((ingredient) => ingredient.food.name),
    };
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

  async findAllByDishCategorySlug(slug: string) {
    const dishes = await this.dishModel
      .find()
      .populate({
        path: "dishCategory",
        match: { slug: slug },
        select: "name",
      })
      .exec();

    const filteredDishes = dishes.filter((dish) => dish.dishCategory !== null);

    const dishIds = filteredDishes.map((dish) => dish._id);

    const ingredients = await this.ingredientModel
      .find({ dish: { $in: dishIds } })
      .populate("food", "name")
      .exec();

    const dishesWithIngredients = filteredDishes.map((dish) => {
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
