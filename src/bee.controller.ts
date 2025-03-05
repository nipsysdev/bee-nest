import { Controller, Get } from '@nestjs/common';
import { BeeService } from './bee.service';
import { Bee } from './models/bee';

@Controller()
export class BeeController {
  constructor(private readonly beeService: BeeService) {}

  @Get()
  getBees(): Bee[] {
    return [];
  }
}
