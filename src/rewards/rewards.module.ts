import { Module } from '@nestjs/common';
import { HttpClientModule } from 'src/http-client/http-client.module';
import { RewardsService } from './rewards.service';

@Module({
  imports: [
    HttpClientModule.register({
      baseUrl: 'https://nestjs1.com',
      isGlobal: true,
    }),
  ],
  providers: [RewardsService],
})
export class RewardsModule {}
