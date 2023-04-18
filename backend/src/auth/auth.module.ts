import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [UsersModule, TokensModule, BcryptModule, RolesModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AutnModule {}
