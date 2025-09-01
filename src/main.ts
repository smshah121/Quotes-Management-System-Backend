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

  app.enableCors({
    origin: [
      'https://peaceful-crisp-c5d1fb.netlify.app',
      'http://localhost:3000',
    ], // frontend domains
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // if you use cookies/auth headers
  });
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Backend running on port ${port}`);
}
bootstrap();
