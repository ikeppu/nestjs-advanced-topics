import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseInterceptors,
  RequestTimeoutException,
} from '@nestjs/common';
import { CircuitBreakerInterceptor } from 'src/common/interceptors/circuit-breaker.interceptor';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

export const COFFEE_DATA_SOURCE = Symbol('COFFEES_DATA_SOURCE');

export interface CoffeeDataSource {
  [index: number]: Coffee;
}
@UseInterceptors(CircuitBreakerInterceptor)
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
    @Inject(COFFEE_DATA_SOURCE) coffeeDataSource: CoffeeDataSource,
  ) {}

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Get()
  findAll() {
    // return this.coffeesService.findAll();
    console.log('Find All exec');
    throw new RequestTimeoutException('Error');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(+id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(+id);
  }
}
