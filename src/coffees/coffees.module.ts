import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController, COFFEE_DATA_SOURCE } from './coffees.controller';

// NEST_DEBUG=true
//  npx madge dist/main.js --circular

@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService, { provide: COFFEE_DATA_SOURCE, useValue: [] }],
})
export class CoffeesModule {}
