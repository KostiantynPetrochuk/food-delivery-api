import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { Custom, CustomDocument } from "./custom.schema/custom.schema";
import { CreateCustomDto } from "./dto/create-custom.dto";

@Injectable()
export class CustomService {
  constructor(@InjectModel(Custom.name) private customModel: Model<CustomDocument>) {}

  async create(dto: CreateCustomDto): Promise<Custom> {
    return this.customModel.create(dto);
  }

  async createMany(dtos: CreateCustomDto[]): Promise<Custom[]> {
    return this.customModel.create(dtos);
  }

  async findById(id: string) {
    return this.customModel.aggregate([
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
          from: "orders",
          localField: "order",
          foreignField: "_id",
          as: "order",
        },
      },
    ]);
  }

  async findAll() {
    return this.customModel.aggregate([
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
          from: "orders",
          localField: "order",
          foreignField: "_id",
          as: "order",
        },
      },
    ]);
  }

  async updateById(id: string, dto: CreateCustomDto) {
    return this.customModel.findOneAndUpdate(new ObjectId(id), dto, { new: true }).exec();
  }

  async delete(id: string) {
    return this.customModel.findByIdAndDelete(id).exec();
  }
}
