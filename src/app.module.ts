import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';

// Feature Modules
import { CandidatesModule } from './modules/candidates/candidates.module';
import { DepartmentModule } from './modules/department/department.module';
import { PositionModule } from './modules/position/position.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { HistoryModule } from './modules/history/history.module';
import { BotModule } from './modules/bot/bot.module';
import { UserModule } from './modules/admins/users.module';
import { SeedModule } from './seed/seed.module';

// Guards and Services
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { BotUpdate } from './modules/bot/bot';
import { MessageService } from './modules/bot/message.service';

// Constants
import { AUTH, RATE_LIMIT, ENV_KEYS } from './constants/app.constants';

/**
 * Root application module
 * Configures all feature modules, database, authentication, and global services
 */
@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),

    // Rate Limiting
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: RATE_LIMIT.TTL,
          limit: RATE_LIMIT.LIMIT,
        },
      ],
    }),

    // Database
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(ENV_KEYS.DB_URL),
        retryWrites: true,
        w: 'majority',
      }),
    }),

    // JWT Authentication
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(ENV_KEYS.JWT_SECRET),
        signOptions: {
          expiresIn: AUTH.TOKEN_EXPIRY,
          issuer: 'hr-management-system',
        },
      }),
    }),

    // Feature Modules
    SeedModule,
    BotModule,
    UserModule,
    CandidatesModule,
    DepartmentModule,
    PositionModule,
    EmployeeModule,
    HistoryModule,
  ],

  controllers: [],

  providers: [
    // Global Guards
    AuthGuard,
    RoleGuard,

    // Bot Services
    BotUpdate,
    MessageService,

    // Global Rate Limiting (commented out for now)
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],

  exports: [AuthGuard, RoleGuard],
})
export class AppModule {}
