import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extract JWT token from Authorization header

    if (!token) {
      return false; // No token provided
    }

    try {
      const decoded = this.jwtService.verify(token); // Verify JWT token
      const user = await this.authService.uniqueUser(decoded.email);

      request.user = { userId: user.id }; // Attach user information to the request object
      return true; // Authentication successful
    } catch (error) {
      return false; // Token verification failed
    }
  }
}
