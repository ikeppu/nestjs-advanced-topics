import { Controller, Get, Query } from '@nestjs/common';
import { FibonacciWorkerHost } from './fibonacci-worker.host';

@Controller('fibonacci')
export class FibonacciController {
  constructor(private readonly fibonacciWorker: FibonacciWorkerHost) {}

  @Get()
  fiboncci(@Query('n') n = 10) {
    console.log(n);
    return this.fibonacciWorker.run(n);
  }
}
