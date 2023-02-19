import { IsNumber, IsString } from "class-validator";

export class CreateCustomDto {
  @IsString()
  dish: string;
  @IsString()
  order: string;
  @IsNumber()
  count: number;
}
