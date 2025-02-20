import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class KeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['token'];

    if (!token || token !== '1234') {
      throw new UnauthorizedException('Access denied: You need an API key.');
    }

    next();
  }
}
