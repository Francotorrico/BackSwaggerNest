import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrganizationModule } from './organization/organization.module';


@Module({
  imports: [UsersModule, AuthModule, OrganizationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}