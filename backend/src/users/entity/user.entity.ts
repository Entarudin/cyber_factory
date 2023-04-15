import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

const TABLE_NAME = 'users';

@Entity({ name: TABLE_NAME })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id?: number;

  @Column({ name: 'login', unique: true })
  public login: string;

  @Column({ name: 'password' })
  public password: string;
}
