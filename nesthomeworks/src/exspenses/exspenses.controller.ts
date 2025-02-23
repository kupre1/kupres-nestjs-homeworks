import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ExspenseService } from './exspenses.service';
import { CreateExspensesDto } from './dtos/create-exspenses.dto';
import { UpdateExspensesDto } from './dtos/update-exspenses.dto';
import { DateRestrictionGuard } from 'src/guards/date.guards';
import { EmailGuard } from 'src/guards/email.guards';

@Controller('exspenses')
@UseGuards(DateRestrictionGuard)
export class ExspenseController {
  constructor(private exspensesService: ExspenseService) {}

  @Get()
  getAllExspenses() {
    return this.exspensesService.findAll();
  }

  @Post()
  @UseGuards(EmailGuard)
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
