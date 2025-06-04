import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { webcrypto } from 'crypto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as any;
}
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: "*"
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
