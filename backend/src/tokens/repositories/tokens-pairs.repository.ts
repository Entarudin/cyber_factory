import { TokenPairEntity } from '@/tokens/dao/entity/token-pair.entity';

export abstract class TokensPairsRepository {
  public abstract save(token: TokenPairEntity): Promise<TokenPairEntity>;
  public abstract findAll(): Promise<TokenPairEntity[]>;
  public abstract getById(id: number): Promise<TokenPairEntity>;
  public abstract findByRefreshToken(token: string): Promise<TokenPairEntity>;
  public abstract deleteByUserId(userId: number): Promise<void>;
  public abstract findByUserId(
    userId: number,
  ): Promise<[TokenPairEntity[], number]>;
  public abstract update(token: TokenPairEntity): Promise<TokenPairEntity>;
  public abstract delete(id: number): Promise<void>;
}
