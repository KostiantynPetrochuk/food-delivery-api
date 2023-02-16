import { Module } from '@nestjs/common';
import { DishController } from './dish.controller';

@Module({
  controllers: [DishController]
})
export class DishModule {}
