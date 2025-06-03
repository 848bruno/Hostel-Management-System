// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config'

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe());

//   const configService = app.get(ConfigService);
//   const PORT = configService.getOrThrow<number>('PORT');

//  await app.listen(process.env.PORT || 3000);

// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Hostel API')
  .setDescription('Hostel Management API')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow<number>('PORT');

  await app.listen(PORT);
  console.log(`Server running on port ${PORT}`);
}
bootstrap();
