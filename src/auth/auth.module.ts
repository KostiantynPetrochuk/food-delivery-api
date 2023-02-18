import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Auth, AuthSchema } from "./auth.schema/auth.schema";
import { AuthService } from "./auth.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
