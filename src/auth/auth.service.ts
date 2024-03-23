import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/users/hash.service';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByUsername(email);
    if (user && (await this.hashService.comparePassword(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
    };
    return {
      message:"Login sucessfully",
      access_token: this.jwtService.sign(payload),
    };
  }
}
