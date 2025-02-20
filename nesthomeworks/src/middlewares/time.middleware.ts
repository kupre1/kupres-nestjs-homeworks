import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TimeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = new Date();
    const hours = now.getHours();
    const startHour = 10;
    const endHour = 19;

    if (!(hours >= startHour && hours < endHour)) {
      throw new UnauthorizedException(
        'Access denied. Requests are allowed only between 10:00 AM and 3:00 PM.',
      );
    }

    next();
  }
}
