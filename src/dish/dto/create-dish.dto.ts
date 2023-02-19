import { IsNumber, IsString } from "class-validator";
import { IsBoolean } from "class-validator/types/decorator/decorators";

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
