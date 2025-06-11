import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AllExceptionsFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  // Enable CORS
  app.enableCors({
    origin: '*', // Adjust this to your needs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  // Register the global exception filter
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('Hostel API')
    .setDescription(
      `# 📝 Complain Management System

A role-based Complain Management System built with **NestJS**, **TypeORM**, and **PostgreSQL**, supporting secure JWT authentication with access and refresh tokens.

## 🚀 Features

- 🔐 JWT Authentication (Access & Refresh Tokens)
- 👥 Role-based Authorization (\`Admin\`, \`Student\`, \`Guest\`)
- 🧾 Complain and Feedback Handling
- 📄 One-to-One and One-to-Many Entity Relationships
- 🗃️ PostgreSQL Integration via TypeORM
- 🔄 Token Refresh and Secure Logout Support

## 🧱 Technologies Used

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Passport.js](http://www.passportjs.org/) (JWT Strategy)
- [Bcrypt](https://www.npmjs.com/package/bcrypt) (Password Hashing)

## 📦 Installation

# Clone the repository
git clone https://github.com/848bruno/hostel-management-system.git
      cd hostel-management-system

# Install dependencies
pnpm install

`,)

    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints') // Add tags for grouping
    .addTag('Student', 'Student management')
    .addTag('Admin', 'Admin management')
    .addTag('Profile', 'Profile management')
    .addTag('Feedback', 'Feedback management')
    .addTag('Complains', 'Complain management')
    .addBearerAuth()
    .addServer('http://localhost:3000', 'Local Development Server') // Add server URL
    .addServer('https://hostel-management-system-csxv.onrender.com', 'Production Server') // Add production server URL
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none', // Collapse all sections by default
      filter: true, // Enable search filter
      showRequestDuration: true, // Show request duration
      tryItOutEnabled: true, // Enable "Try it out" button
    },
    customCss: `
    .swagger-ui .topbar { display: none; }    /* Hide Swagger logo */
    .swagger-ui .info { margin-bottom: 20px; }
  `,
    customSiteTitle: 'Hostel API Documentation',
  });
  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow<number>('PORT');

  await app.listen(PORT);
  console.log(`Server running on port ${PORT} `);
}
bootstrap();
