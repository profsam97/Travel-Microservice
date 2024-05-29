
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      // User is authenticated, prevent access to the signup route
      return res.status(403).json({ message: 'You are already signed in' });
    }
    // User is not authenticated, allow access to the route
    next();
  }
}
