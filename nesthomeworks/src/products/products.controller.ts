import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { QueryParamsPipe } from './pipes/query.pipe';
import { UpdateProductsDto } from './dtos/update-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll(@Query(new QueryParamsPipe()) query) {
    return this.productsService.getAll(query);
  }

  @Get(':id')
  getProductsBuId(@Param('id', ParseIntPipe) id) {
    return this.productsService.getById(+id);
  }

  @Post()
  createProduct(@Body() body, @Headers() headers) {
    return this.productsService.createProducts(body, headers);
  }

  @Delete(':id')
  deleteProducts(@Param('id') id: number) {
    return this.productsService.deleteProducts(+id);
  }

  @Put(':id')
  updateProduts(
    @Param('id') id: number,
    @Body() updateProductsDtos: UpdateProductsDto,
  ) {
    return this.productsService.updateProducts(+id, updateProductsDtos);
  }
}
