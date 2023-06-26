import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order, OrderDocument } from "./order.schema/order.schema";
import { CreateCustomDto } from "src/custom/dto/create-custom.dto";
import { Custom, CustomDocument } from "src/custom/custom.schema/custom.schema";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Custom.name) private customModel: Model<CustomDocument>,
  ) {}

  async create(dto: CreateOrderDto, dtos: Omit<CreateCustomDto, "order">[]): Promise<Order> {
    const newOrder = await this.orderModel.create(dto);

    const updatedDtos = dtos.map((custom) => ({
      dish: custom.dish,
      order: newOrder._id,
      count: custom.count,
    }));

    this.customModel.create(updatedDtos);

    return newOrder;
  }

  async findById(id: string) {
    return this.orderModel
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: "customs",
            localField: "_id",
            foreignField: "order",
            as: "customs",
          },
        },
      ])
      .exec();
  }

  async findAll() {
    return this.orderModel
      .aggregate([
        {
          $lookup: {
            from: "customs",
            localField: "_id",
            foreignField: "order",
            as: "customs",
          },
        },
      ])
      .exec();
  }

  async updateById(id: string, dto: CreateOrderDto) {
    return this.orderModel.findOneAndUpdate(new ObjectId(id), dto, { new: true }).exec();
  }

  async delete(id: string) {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
