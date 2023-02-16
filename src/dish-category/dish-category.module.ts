import { Module } from '@nestjs/common';
import { DishCategoryController } from './dish-category.controller';

@Module({
  controllers: [DishCategoryController]
})
export class DishCategoryModule {}
