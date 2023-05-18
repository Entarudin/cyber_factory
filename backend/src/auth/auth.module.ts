import { Module } from '@nestjs/common';
import { BcryptModule } from '@/bcrypt/bcrypt.module';
import { TokensModule } from '@/tokens/tokens.module';
import { UsersModule } from '@/users/users.module';
import { AuthService } from '@/auth/services/auth.service';
import { AuthController } from '@/auth/controllers/auth.controller';
import { RolesModule } from '@/roles/roles.module';

@Module({
  imports: [UsersModule, TokensModule, BcryptModule, RolesModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
