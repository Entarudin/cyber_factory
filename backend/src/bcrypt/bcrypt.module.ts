import { Module } from '@nestjs/common';
import { BcryptService } from '@/bcrypt/services';

@Module({
  imports: [],
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}
