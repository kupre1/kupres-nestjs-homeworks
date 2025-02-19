import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExspensesModule } from './exspenses/exspenses.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModule, ExspensesModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
