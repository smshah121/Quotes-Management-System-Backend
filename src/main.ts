import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { webcrypto } from 'node:crypto';

// Polyfill for crypto.randomUUID
if (!globalThis.crypto) {
  globalThis.crypto = {
    randomUUID: () => webcrypto.randomUUID()
  } as any;
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: "*"
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
