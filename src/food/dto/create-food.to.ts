import { IsString } from "class-validator";

export class CreateFoodDto {
  @IsString()
  name: string;
}
