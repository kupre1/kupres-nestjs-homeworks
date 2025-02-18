import { Module } from '@nestjs/common';
import { ExspenseController } from './exspenses.controller';
import { ExspenseService } from './exspenses.service';

@Module({
  imports: [],
  controllers: [ExspenseController],
  providers: [ExspenseService],
})
export class ExspensesModule {}
