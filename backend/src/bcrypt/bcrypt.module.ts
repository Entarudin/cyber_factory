import { Module } from '@nestjs/common';
import { BcryptService } from './services';

@Module({
  imports: [],
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}
