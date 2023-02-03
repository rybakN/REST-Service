import { DBEntity } from './DBEntity';
import { UserEntity } from '../../../user/entities/user.entity';
import { CreateUserDto } from '../../../user/dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

export type ChangeUserDTO = {
  password: string;
  updatedAt: number;
  version: number;
};

export class DBUsers extends DBEntity<
  UserEntity,
  CreateUserDto,
  ChangeUserDTO
> {
  constructor() {
    super();
  }

  public async create(createDTO: CreateUserDto): Promise<UserEntity> {
    const entity: UserEntity = {
      ...createDTO,
      id: uuidv4(),
      version: 1,
      createdAt: Number(new Date()),
      updatedAt: Number(new Date()),
    };
    this.entities.push(entity);
    return entity;
  }
}
