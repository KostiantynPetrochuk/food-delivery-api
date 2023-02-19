import { IsNumber, IsString, IsBoolean } from "class-validator";

export class CreateDishDto {
  @IsString()
  dishCategory: string;
  @IsString()
  name: string;
  @IsString()
  imagePath: string;
  @IsNumber()
  weight: number;
  @IsNumber()
  price: number;
  @IsBoolean()
  isNovelty: boolean;
}
