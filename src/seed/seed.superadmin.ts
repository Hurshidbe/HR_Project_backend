import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { UserRole } from 'src/enums/enums';
import { UsersService } from 'src/modules/admins/users.service';
import { error } from 'console';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  const adminsService = app.get(UsersService);

  const superadmin = {
    username: process.env.SUPERADMIN || '',
    password: process.env.SUPERADMIN_PASS || '',
    role: UserRole.SuperAdmin,
  };

  try {
    const created = await adminsService.create(superadmin);
    console.log('Superadmin created successfully!');
  } catch (err) {
    console.error(' Failed to create superadmin:', err.message);
  } finally {
    await app.close();
  }
}
bootstrap();
