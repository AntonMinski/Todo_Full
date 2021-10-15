import { forwardRef, Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt.refreshtoken.strategy';



@Module({
  imports: [
    // prevent the circular dependency:
    forwardRef(() => UserModule),
    CommonModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtRefreshTokenStrategy ,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}