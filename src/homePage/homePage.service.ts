import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { Dish, DishDocument } from "../dish/dish.schema/dish.schema";
import { Event, EventDocument } from "src/event/event.schema/event.schema";
import { Ingredient, IngredientDocument } from "src/ingredient/ingredient.schema/ingredient.schema";

@Injectable()
export class HomePageService {
  constructor(
    @InjectModel(Dish.name) private dishModel: Model<DishDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>,
  ) {}

  async getHomeDishesAndEvents() {
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

    const ramensIds = ramens.map((ramen) => ramen._id);

    const ramensIngredients = await this.ingredientModel
      .find({ dish: { $in: ramensIds } })
      .populate("food", "name")
      .exec();

    const ramensWithIngredients = ramens.map((ramen) => {
      const ramenIngredients = ramensIngredients
        .filter((ingredient) => ingredient.dish.toString() === ramen._id.toString())
        .map((ingredient) => ingredient.food.name);

      return { ...ramen, ingredients: ramenIngredients };
    });

    const pizzasIds = pizzas.map((pizza) => pizza._id);

    const pizzasIngredients = await this.ingredientModel
      .find({ dish: { $in: pizzasIds } })
      .populate("food", "name")
      .exec();

    const pizzasWithIngredients = pizzas.map((pizza) => {
      const pizzaIngredients = pizzasIngredients
        .filter((ingredient) => ingredient.dish.toString() === pizza._id.toString())
        .map((ingredient) => ingredient.food.name);

      return { ...pizza, ingredients: pizzaIngredients };
    });

    const latestEvents = await this.eventModel.find().sort({ _id: -1 }).limit(4).exec();

    return {
      novelties,
      ramen: ramensWithIngredients,
      pizza: pizzasWithIngredients,
      latestEvents,
    };
  }
}
