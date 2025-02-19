import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ProductsClass } from './products.inteface';
import { query } from 'express';
import { UpdateProductsDto } from './dtos/update-products.dto';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 1,
      name: 'food',
      price: 20,
      category: 'dogfood',
      createdAt: '20.00',
    },
    {
      id: 2,
      name: 'drink',
      price: 20,
      category: 'boom',
      createdAt: '18.00',
    },
    { id: 3, name: 'apple', price: 10, category: 'green', createdAt: '14.00' },
  ];

  getAll(query): ProductsClass[] {
    const { category, price, id } = query;

    if (category && price) {
      const categoryFilterData = this.products.filter(
        (el) => el.category === category,
      );
      const priceFilterData = categoryFilterData.filter(
        (el) => el.price === +price,
      );
      return priceFilterData;
    }

    if (category) {
      return this.products.filter((el) => el.category === category);
    }
    if (price) {
      return this.products.filter((el) => el.price >= +price);
    }
    if (id) {
      return this.products.filter((el) => el.id === +id);
    }

    return this.products;
  }

  getById(id: number) {
    const product = this.products.find((el) => el.id === id);
    if (!product) throw new NotFoundException('product not found');
    return product;
  }

  createProducts(body, headers) {
    if (!headers.password || headers.password !== '123')
      throw new BadRequestException('permition dined');
    const { name, price, category, createdAt } = body;
    if (!category || !name || !createdAt || !price)
      throw new HttpException('yvelaferi sachiroa', HttpStatus.BAD_REQUEST);
    const lastId = this.products[this.products.length - 1]?.id || 0;
    const newProducts = {
      id: lastId + 1,
      name,
      price,
      category,
      createdAt: new Date().toISOString(),
    };
    this.products.push(newProducts);
    return newProducts;
  }

  async deleteProducts(id: number) {
    const index = await this.products.findIndex((el) => el.id === +id);
    if (index === -1)
      throw new HttpException('expenses not found', HttpStatus.NOT_FOUND);
    const deleteProducts = await this.products.splice(index, 1);
    return deleteProducts;
  }

  async updateProducts(id: number, updateProductsDto: UpdateProductsDto) {
    const index = await this.products.findIndex((el) => el.id === +id);
    if (index === -1)
      throw new HttpException('expenses not found', HttpStatus.NOT_FOUND);
    this.products[index] = {
      ...this.products[index],
      ...updateProductsDto,
    };

    return this.products[index];
  }
}
