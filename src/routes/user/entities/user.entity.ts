import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  login: string;
  @Column()
  password: string;
  @Column()
  createdAt: number;
  @Column()
  updatedAt: number;
  @Column()
  version: number;
}
