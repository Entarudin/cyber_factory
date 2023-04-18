import { InjectRepository } from '@nestjs/typeorm';
import { TokenPair } from '../dao/entity/token-pair.entity';
import { TokensPairsRepository } from './tokens-pairs.repository';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostgresTokensPairsRepository extends TokensPairsRepository {
  constructor(
    @InjectRepository(TokenPair)
    private readonly repository: Repository<TokenPair>,
  ) {
    super();
  }

  public async save(token: TokenPair): Promise<TokenPair> {
    return this.repository.save(token);
  }

  public async findAll(): Promise<TokenPair[]> {
    return this.repository.find({});
  }

  public async getById(id: number): Promise<TokenPair> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async findByRefreshToken(token: string): Promise<TokenPair> {
    return this.repository.findOne({
      where: {
        refreshToken: token,
      },
    });
  }

  public async update(token: TokenPair): Promise<TokenPair> {
    return this.repository.save(token);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  public async deleteByUserId(userId: number): Promise<void> {
    await this.repository.delete(userId);
  }
  public async findByUserId(userId: number): Promise<[TokenPair[], number]> {
    return await this.repository.findAndCount({
      where: {
        userId,
      },
    });
  }
}
