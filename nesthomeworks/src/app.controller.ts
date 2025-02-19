import { Controller, DefaultValuePipe, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('language')
  getLanguage(@Query('lang', new DefaultValuePipe('en')) lang) {
    return this.appService.getLanguage(lang);
  }
}
