import { IsNumber, IsString, IsBoolean } from "class-validator";

export class CreateOrderDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  surrName: string;
  @IsNumber()
  phone: number;
  @IsBoolean()
  delivery: boolean;
  @IsString()
  address: string;
  @IsBoolean()
  status: boolean;
  @IsBoolean()
  paymentMethod: boolean;
  @IsString()
  deliveryTime: string;
}
