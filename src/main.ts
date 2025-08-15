import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { webcrypto } from 'node:crypto';
import { ConfigService } from '@nestjs/config';

// Polyfill for crypto.randomUUID
if (!globalThis.crypto) {
  globalThis.crypto = {
    randomUUID: () => webcrypto.randomUUID(),
  } as any;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // ⚡ CORS middleware for Vercel
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://quotes-frontend-tszy.vercel.app');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      return res.end();
    }
    next();
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Backend running on port ${port}`);
}
bootstrap();
