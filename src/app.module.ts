import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    UserModule,
    MongooseModule.forRoot(ConfigService.keys.MONGO_URL),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
