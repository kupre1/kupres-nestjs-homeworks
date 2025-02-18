import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExspensesDto } from './dtos/create-exspenses.dto';
import { UpdateExspensesDto } from './dtos/update-exspenses.dto';

@Injectable()
export class ExspenseService {
  private expenses = [
    {
      id: 1,
      category: 'animals',
      productName: 'Dog Food',
      quantity: 2,
      price: 20,
      totalPrice: 40,
    },
    {
      id: 2,
      category: 'electronics',
      productName: 'Headphones',
      quantity: 1,
      price: 100,
      totalPrice: 100,
    },
    {
      id: 3,
      category: 'groceries',
      productName: 'Apples',
      quantity: 5,
      price: 2,
      totalPrice: 10,
    },
  ];

  createExspenses(createUserDto: CreateExspensesDto) {
    const { category, productName, quantity, price, totalPrice } =
      createUserDto;
    if (!category || !productName || !quantity || !price || !totalPrice)
      throw new HttpException('yvelaferi sachiroa', HttpStatus.BAD_REQUEST);
    const lastId = this.expenses[this.expenses.length - 1]?.id || 0;
    const newExspenses = {
      id: lastId + 1,
      category,
      productName,
      quantity,
      price,
      totalPrice: quantity * price,
    };
    this.expenses.push(newExspenses);
    return newExspenses;
  }

  findAll() {
    return this.expenses;
  }

  async getExspensesById(id: number) {
    const expense = await this.expenses.find((e) => e.id === id);
    if (!expense)
      throw new HttpException('exspense not found', HttpStatus.NOT_FOUND);
    return expense;
  }

  async deleteUser(id: number) {
    const index = await this.expenses.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('expenses not found', HttpStatus.NOT_FOUND);
    const deleteExspenses = await this.expenses.splice(index, 1);
    return deleteExspenses;
  }

  async updateUser(id: number, updateExspansesDto: UpdateExspensesDto) {
    const index = await this.expenses.findIndex((el) => el.id === +id);
    if (index === -1)
      throw new HttpException('expenses not found', HttpStatus.NOT_FOUND);
    this.expenses[index] = {
      ...this.expenses[index],
      ...updateExspansesDto,
    };

    this.expenses[index].totalPrice =
      this.expenses[index].price * this.expenses[index].quantity;

    return this.expenses[index];
  }
}
