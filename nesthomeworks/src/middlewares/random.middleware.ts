import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RandomMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const randomNumber = Math.random();

    if (!(randomNumber < 0.5)) {
      throw new UnauthorizedException('Access denied. You are out of luck. ');
    }

    next();
  }
}
