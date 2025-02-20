import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { KeyMiddleware } from 'src/middlewares/delete.middleware';
import { RandomMiddleware } from 'src/middlewares/random.middleware';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(KeyMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.DELETE });

    consumer
      .apply(RandomMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.POST });
  }
}
