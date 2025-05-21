import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuoteModule } from './quote/quote.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { Quote } from './quote/entities/quote.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    // Load .env file and make env variables globally available
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Use ConfigService to read database config from .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: false,
        entities: [Quote, User],
      }),
    }),

    // Application Modules
    QuoteModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
