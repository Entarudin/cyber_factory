import { InjectRepository } from '@nestjs/typeorm';
import { TokenPairEntity } from '@/tokens/dao/entity/token-pair.entity';
import { TokensPairsRepository } from '@/tokens/repositories/tokens-pairs.repository';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostgresTokensPairsRepository extends TokensPairsRepository {
  constructor(
    @InjectRepository(TokenPairEntity)
    private readonly repository: Repository<TokenPairEntity>,
  ) {
    super();
  }

  public async save(token: TokenPairEntity): Promise<TokenPairEntity> {
    return this.repository.save(token);
  }

  public async findAll(): Promise<TokenPairEntity[]> {
    return this.repository.find({});
  }

  public async getById(id: number): Promise<TokenPairEntity> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async findByRefreshToken(token: string): Promise<TokenPairEntity> {
    return this.repository.findOne({
      where: {
        refreshToken: token,
      },
    });
  }

  public async update(token: TokenPairEntity): Promise<TokenPairEntity> {
    return this.repository.save(token);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  public async deleteByUserId(userId: number): Promise<void> {
    const tokens = await this.repository.find({
      where: {
        userId,
      },
    });

    await this.repository.remove(tokens);
  }

  public async findByUserId(
    userId: number,
  ): Promise<[TokenPairEntity[], number]> {
    return this.repository.findAndCount({
      where: {
        userId: userId,
      },
    });
  }
}
