import { IsString } from "class-validator";

export class CreateDishCategoryDto {
  @IsString()
  name: string;
  @IsString()
  slug: string;
}
