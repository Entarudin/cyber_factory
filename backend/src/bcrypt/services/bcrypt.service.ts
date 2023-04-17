import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly saltOrRounds = 7;

  public async generateHash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.saltOrRounds);
    return hash;
  }

  public async compareHash(matchValue: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(matchValue, hash);
    return isMatch;
  }
}
