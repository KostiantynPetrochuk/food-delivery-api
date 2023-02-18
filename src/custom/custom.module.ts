import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomController } from "./custom.controller";
import { Custom, CustomSchema } from "./custom.schema/custom.schema";
import { CustomService } from "./custom.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Custom.name, schema: CustomSchema }])],
  controllers: [CustomController],
  providers: [CustomService],
})
export class CustomModule {}
