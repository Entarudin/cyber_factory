import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@/users/repositories/users.repository';
import { UserEntity } from '@/users/dao/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostrgresUsersRepository extends UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {
    super();
  }

  public async save(user: UserEntity): Promise<UserEntity> {
    return await this.repository.save(user);
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOneBy({ email });
  }

  public async findAll(): Promise<UserEntity[]> {
    return await this.repository.find();
  }

  public async getById(id: number): Promise<UserEntity> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(user: UserEntity): Promise<UserEntity> {
    return await this.repository.save(user);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
