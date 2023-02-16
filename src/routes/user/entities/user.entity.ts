import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  login: string;
  @Column()
  password: string;
  @Column({ type: 'bigint' })
  createdAt: number;
  @Column({ type: 'bigint' })
  updatedAt: number;
  @Column()
  version: number;
}
