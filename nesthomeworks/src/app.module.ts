import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExspensesModule } from './exspenses/exspenses.module';
import { ProductsModule } from './products/products.module';
import { TimeMiddleware } from './middlewares/time.middleware';

@Module({
  imports: [UsersModule, ExspensesModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TimeMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
