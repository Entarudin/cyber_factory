import { UserEntity } from '../dao/entity/user.entity';

export abstract class UsersRepository {
  abstract save(user: UserEntity): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract getById(id: number): Promise<UserEntity>;
  abstract update(user: UserEntity): Promise<UserEntity>;
  abstract delete(id: number): Promise<void>;
}
