import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExspensesModule } from './exspenses/exspenses.module';

@Module({
  imports: [UsersModule, ExspensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
