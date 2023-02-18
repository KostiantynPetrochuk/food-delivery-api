import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DishCategory, DishCategoryDocument } from "./dish-category.schema/dish-category.schema";
import { CreateDishCategoryDto } from "./dto/create-dish-category.dto";
import { ObjectId } from "mongodb";

@Injectable()
export class DishCategoryService {
  constructor(
    @InjectModel(DishCategory.name) private dishCategoryModel: Model<DishCategoryDocument>,
  ) {}
  async create(dto: CreateDishCategoryDto): Promise<DishCategory> {
    return this.dishCategoryModel.create(dto);
  }

  async findById(id: string) {
    return this.dishCategoryModel.findById(id);
  }

  async findAll() {
    return this.dishCategoryModel.find();
  }

  async updateById(id: string, dto: CreateDishCategoryDto) {
    return this.dishCategoryModel.findOneAndUpdate(new ObjectId(id), dto, { new: true }).exec();
  }

  async delete(id: string) {
    return this.dishCategoryModel.findByIdAndDelete(id).exec();
  }
}
