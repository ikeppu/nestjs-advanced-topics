import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(private readonly lazyModuleLoader: LazyModuleLoader) {}

  create(createCoffeeDto: CreateCoffeeDto) {
    return 'This action adds a new coffee';
  }

  async findAll() {
    console.time();
    const rewardsModuleRef = await this.lazyModuleLoader.load(() => {
      return import('../rewards/rewards.module').then((m) => m.RewardsModule);
    });

    const { RewardsService } = await import('../rewards/rewards.service');

    const rewardService = rewardsModuleRef.get(RewardsService);
    console.timeEnd();
    rewardService.grantTo();

    return `This action returns all coffees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coffee`;
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    return `This action updates a #${id} coffee`;
  }

  remove(id: number) {
    return `This action removes a #${id} coffee`;
  }
}
