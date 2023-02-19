import { IsString } from "class-validator";

export class CreateIngredientDto {
  @IsString()
  food: string;
  @IsString()
  dish: string;
}
