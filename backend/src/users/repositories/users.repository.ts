import { UserEntity } from '../dao/entity/user.entity';

export abstract class UsersRepository {
  public abstract save(user: UserEntity): Promise<UserEntity>;
  public abstract findByEmail(email: string): Promise<UserEntity>;
  public abstract findAll(): Promise<UserEntity[]>;
  public abstract getById(id: number): Promise<UserEntity>;
  public abstract update(user: UserEntity): Promise<UserEntity>;
  public abstract delete(id: number): Promise<void>;
}
