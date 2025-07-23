import { Module } from '@nestjs/common';
import { AdminsModule } from './modules/admins/users.module';
import { CandidatesModule } from './modules/candidates/candidates.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { CandidatesService } from './modules/candidates/candidates.service';
import { SeedModule } from './seed/seed.module';
import { RoleGuard } from './guards/role.guard';
import { DepartmentModule } from './modules/department/department.module';
import { PositionModule } from './modules/position/position.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { HistoryModule } from './modules/history/history.module';
import { BotModule } from './modules/bot/bot.module';
dotenv.config();

@Module({
  imports: [
    // ThrottlerModule.forRoot({
    //   throttlers: [{ ttl: 20000, limit: 5 }],
    // }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.DB_URL || ''),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (service: ConfigService) => {
        return {
          secret: service.get('JWT'),
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
    SeedModule,
    AdminsModule,
    CandidatesModule,
    DepartmentModule,
    PositionModule,
    EmployeeModule,
    HistoryModule,
    BotModule,
  ],
  controllers: [],
  providers: [
    AuthGuard,
    RoleGuard,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule {}
