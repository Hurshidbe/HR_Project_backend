import { APP_GUARD, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe, ArgumentsHost } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { METHODS } from 'http';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

  const defaultOrigins = ['http://localhost:4200', 'http://localhost:3000'];
  const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
    : defaultOrigins;

  app.enableCors({
    origin: allowedOrigins,
    methods: METHODS,
    credentials: true,
  });

  const swagger = new DocumentBuilder()
    .setTitle('Hr_backend')
    .setDescription('Hr_project all endpoints')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('apis', app, document);
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const port = process.env.PORT ?? 5000;
  await app.listen(port);
  console.warn(`Server running on port ${port}`);
  console.warn(`APIs documentation : http://localhost:${port}/apis`);
}
bootstrap();
