import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class DateRestrictionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const now = new Date();
    const HolidayDays = [{ month: 4, day: 26 }];

    const isHoliday = HolidayDays.some(
      (date) => now.getMonth() === date.month && now.getDate() === date.day,
    );

    if (isHoliday) {
      throw new UnauthorizedException(
        'Access denied: Today is a restricted holiday.',
      );
    }

    return true;
  }
}
