import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'db',
      port: configService.get('NODE_ENV_DATABASE_PORT'),
      username: configService.get('NODE_ENV_DATABASE_USER'),
      password: configService.get('NODE_ENV_DATABASE_PASSWORD'),
      database: configService.get('NODE_ENV_DATABASE_NAME'),
      autoLoadEntities: true,
      entities: [
      __dirname + '/../**/*.entity.ts',
    ],
      synchronize: true,
    //   logging: true,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService]
};