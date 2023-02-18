import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthDto } from "../auth/dto/auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() dto: AuthDto) {}

  @HttpCode(200)
  @Post("login")
  async login(@Body() dto: AuthDto) {}
}
