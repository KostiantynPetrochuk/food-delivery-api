import { IsString } from "class-validator";

export class CreateEventDto {
  @IsString()
  imagePath: string;
  @IsString()
  title: string;
  @IsString()
  body: string;
}
