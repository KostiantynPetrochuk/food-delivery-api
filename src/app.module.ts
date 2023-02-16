import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DishCategoryModule } from "./dish-category/dish-category.module";
import { IngredientModule } from "./ingredient/ingredient.module";
import { DishModule } from "./dish/dish.module";
import { FoodModule } from "./food/food.module";
import { OrderModule } from "./order/order.module";
import { CustomModule } from "./custom/custom.module";
import { EventModule } from "./event/event.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    DishCategoryModule,
    IngredientModule,
    DishModule,
    FoodModule,
    OrderModule,
    CustomModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
