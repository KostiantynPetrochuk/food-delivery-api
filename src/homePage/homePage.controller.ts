import { Controller, Get } from "@nestjs/common";
import { HomePageService } from "./homePage.service";

@Controller("homePage")
export class HomePageController {
  constructor(private readonly homePageService: HomePageService) {}

  @Get()
  async getHomePageData() {
    return this.homePageService.getHomeDishesAndEvents();
  }
}
