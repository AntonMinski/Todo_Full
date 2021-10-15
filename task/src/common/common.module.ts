import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import { ConfigService, ConfigModule } from '@nestjs/config';



@Module({
    imports: [
      // JwtModule.register({
      //   secret: jwtConstants.secret, 
      //   signOptions: { expiresIn: '1d'}
      // }
      
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          return {
            secret: configService.get('NODE_ENV_JWT_SECRET_KEY'),
            signOptions: { expiresIn: 20}
          };
        },
        inject: [ConfigService]
      }),
      ],
       
      exports: [JwtModule]
})
export class CommonModule {}