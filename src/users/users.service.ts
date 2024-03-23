import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashService } from './hash.service';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private hashService: HashService,
  ) {}

  async getUserByUsername(username: string) {
    try {
      return this.userModel.findOne({
        username,
      });
    } catch (error) {
      throw error;
    }
  }

  async registerUser(createUserDto: CreateUserDto) {
    try {
      const createUser = new this.userModel(createUserDto);
      // check if user exists
      const user = await this.getUserByUsername(createUser.username);
      if (user) {
        throw new BadRequestException('This username is already exists');
      }
      // Hash Password
      createUser.password = await this.hashService.hashPassword(
        createUser.password,
      );
      await createUser.save();
      return { message: 'Signup successfully' };
    } catch (error) {
      throw error;
    }
  }
}
