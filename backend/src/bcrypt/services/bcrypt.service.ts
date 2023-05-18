import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly saltOrRounds = 7;

  public async generateHash(value: string): Promise<string> {
    return bcrypt.hash(value, this.saltOrRounds);
  }

  public async compareHash(matchValue: string, hash: string): Promise<boolean> {
    return bcrypt.compare(matchValue, hash);
  }
}
