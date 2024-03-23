import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Extract token from request (assuming it's in headers)
    const token = request.headers.authorization?.split(' ')[1];
    console.log(token)
    if (!token) {
      return false;
    }

    try {
      // Decode token to obtain payload
      const payload = this.jwtService.verify(token);

      // Retrieve user ID from payload
      const userId = payload.sub; // Assuming sub contains the user ID

      // Attach user ID to request for later use if needed
      request.userId = userId;

      return true;
    } catch (err) {
      return false;
    }
  }
}
