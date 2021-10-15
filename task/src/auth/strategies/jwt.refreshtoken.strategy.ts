import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {Injectable, UnauthorizedException, Body} from '@nestjs/common';
// import { User } from 'src/user/model/user.entity';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

 
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy,"jwt-refreshtoken") {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private readonly authService: AuthService,
    ) {
  
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: true,
      secretOrKey: configService.get('NODE_ENV_JWT_SECRET_KEY'),
      passReqToCallback: true
    });
  }
 
  async validate(req,payload: any) {
       
    // const user = await this.userService.findOne(payload.email);
    const user = await this.authService.validateUser(payload);

    // console.log('user.refreshToken', user.refreshToken,  'req.body.refreshToken', req.body.refreshToken)

    if(!user){
        throw new UnauthorizedException();
    }
    if(req.body.refreshToken != user.refreshToken){
        throw new UnauthorizedException();
    }
    // if( new Date() > new Date((await user).refreshtokenexpires)){
    //   throw new UnauthorizedException();
    // }
    return user;
  }
}