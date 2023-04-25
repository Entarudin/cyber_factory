import { TokenPair } from '@/tokens/dao/entity/token-pair.entity';

export abstract class TokensPairsRepository {
  public abstract save(token: TokenPair): Promise<TokenPair>;
  public abstract findAll(): Promise<TokenPair[]>;
  public abstract getById(id: number): Promise<TokenPair>;
  public abstract findByRefreshToken(token: string): Promise<TokenPair>;
  public abstract deleteByUserId(userId: number): Promise<void>;
  public abstract findByUserId(userId: number): Promise<[TokenPair[], number]>;
  public abstract update(token: TokenPair): Promise<TokenPair>;
  public abstract delete(id: number): Promise<void>;
}
