import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SWAGGER, DEFAULTS, ENV_KEYS } from './constants/app.constants';

/**
 * Bootstrap the NestJS application
 */
async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');

  try {
    // Create NestJS application
    const app = await NestFactory.create(AppModule);

    // Configure CORS
    app.enableCors({
      origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://192.168.11.141:5000',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Configure Swagger documentation
    const swaggerConfig = new DocumentBuilder()
      .setTitle(SWAGGER.TITLE)
      .setDescription(SWAGGER.DESCRIPTION)
      .setVersion(SWAGGER.VERSION)
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
      .addTag('Authentication', 'User authentication endpoints')
      .addTag('Candidates', 'Candidate management endpoints')
      .addTag('Employees', 'Employee management endpoints')
      .addTag('Departments', 'Department management endpoints')
      .addTag('Positions', 'Position management endpoints')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(SWAGGER.PATH, app, document);

    // Configure middleware
    app.use(cookieParser());

    // Configure global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // Get port from environment or use default
    const port = process.env[ENV_KEYS.PORT] || DEFAULTS.PORT;

    // Start the server
    await app.listen(port);

    logger.log(`🚀 Application is running on: http://localhost:${port}`);
    logger.log(
      `📚 API Documentation: http://localhost:${port}/${SWAGGER.PATH}`,
    );
    logger.log(
      `🌍 Environment: ${process.env[ENV_KEYS.NODE_ENV] || 'development'}`,
    );
  } catch (error) {
    logger.error('❌ Error starting the application', error);
    process.exit(1);
  }
}

// Start the application
bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
