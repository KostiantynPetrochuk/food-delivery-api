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
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { getMongoConfig } from "./configs/mongo.config";
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMongoConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    DishCategoryModule,
    IngredientModule,
    DishModule,
    FoodModule,
    OrderModule,
    CustomModule,
    EventModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
