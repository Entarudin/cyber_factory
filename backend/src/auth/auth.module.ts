import { Module } from '@nestjs/common';

import { AuthController } from '@/auth/controllers/auth.controller';
import { AuthService } from '@/auth/services/auth.service';
import { BcryptModule } from '@/bcrypt/bcrypt.module';
import { RolesModule } from '@/roles/roles.module';
import { TokensModule } from '@/tokens/tokens.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [UsersModule, TokensModule, BcryptModule, RolesModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
