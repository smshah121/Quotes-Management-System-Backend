import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { webcrypto } from 'node:crypto';
import { ConfigService } from '@nestjs/config';

// Polyfill for crypto.randomUUID
if (!globalThis.crypto) {
  globalThis.crypto = {
    randomUUID: () => webcrypto.randomUUID()
  } as any;
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // <--- ADD THIS LINE
  const jwtSecret = configService.get<string>('JWT_SECRET'); // <--- ADD THIS LINE
  console.log('DEBUG: JWT_SECRET from ConfigService:', jwtSecret); // 
  
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
  origin: [
    'https://quotes-frontend-tszy.vercel.app',
    'http://localhost:3000'
  ],
  credentials: false,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
