import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    
    const user = configService.get('NODE_ENV_DATABASE_USER');
    const password = configService.get('NODE_ENV_DATABASE_PASSWORD');
    const dbName = configService.get('NODE_ENV_DATABASE_NAME');

    return {
      type: 'postgres',
      url: `postgres://${user}:${password}@db:5432/${dbName}`,
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