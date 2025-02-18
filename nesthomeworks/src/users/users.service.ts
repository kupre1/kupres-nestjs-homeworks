import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 2,
      Firstname: 'giorgi',
      LastName: 'gobeglejiashvili',
      age: 12,
      email: 'giorgigobeglejiashvili@gmail.com',
      phone: 599765567,
      gender: 'male',
    },
  ];

  createUser(createUserDto: CreateUserDto) {
    const { Firstname, LastName, age, email, phone, gender } = createUserDto;
    if (!Firstname || !LastName || !age || !email || !phone || !gender)
      throw new HttpException(' yvelaferi sachiroa', HttpStatus.BAD_REQUEST);
    const lastId = this.users[this.users.length - 1]?.id || 0;
    const newUser = {
      id: lastId + 1,
      age,
      email,
      phone,
      Firstname,
      gender,
      LastName,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  async getUserById(id: number) {
    const user = await this.users.find((e) => e.id === id);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async deleteUser(id: number) {
    const index = await this.users.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    const deleteUser = await this.users.splice(index, 1);
    return deleteUser;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const index = await this.users.findIndex((e) => e.id === +id);
    if (index === -1)
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    this.users[index] = {
      ...this.users[index],
      ...updateUserDto,
    };
    return this.users[index];
  }
}
