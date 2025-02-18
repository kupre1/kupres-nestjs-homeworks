import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExspenseService } from './exspenses.service';
import { CreateExspensesDto } from './dtos/create-exspenses.dto';
import { UpdateExspensesDto } from './dtos/update-exspenses.dto';

@Controller('exspenses')
export class ExspenseController {
  constructor(private exspensesService: ExspenseService) {}

  @Get()
  getAllExspenses() {
    return this.exspensesService.findAll();
  }

  @Post()
  createExspenses(@Body() createExspenses: CreateExspensesDto) {
    return this.exspensesService.createExspenses(createExspenses);
  }

  @Get(':id')
  getExspensesId(@Param('id') id) {
    return this.exspensesService.getExspensesById(+id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.exspensesService.deleteUser(+id);
  }

  @Put(':id')
  updateExspense(
    @Param('id') id: number,
    @Body() updateExspansesDto: UpdateExspensesDto,
  ) {
    return this.exspensesService.updateUser(+id, updateExspansesDto);
  }
}
