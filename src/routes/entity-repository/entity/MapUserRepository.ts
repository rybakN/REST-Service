import { UserEntity } from '../../user/entities/user.entity';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UpdateUserDto } from '../../user/dto/update-user.dto';
import { v4 as uuidV4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from '../interface/EntityRepository';

@Injectable()
export class MapUserRepository
  implements EntityRepository<UserEntity, CreateUserDto, UpdateUserDto>
{
  users: Map<string, UserEntity> = new Map();

  async getAll(): Promise<UserEntity[]> {
    const users: UserEntity[] = [];
    for (const key of this.users.keys()) {
      users.push(this.users.get(key));
    }
    return users;
  }

  async getOne(id: string): Promise<UserEntity> {
    const user: UserEntity | null = this.users.get(id);
    if (!user) return null;
    return user;
  }

  async create(createUserDTO: CreateUserDto): Promise<UserEntity> {
    const key: string = uuidV4();
    const user: UserEntity = {
      ...createUserDTO,
      id: key,
      version: 1,
      createdAt: Number(new Date()),
      updatedAt: Number(new Date()),
    };
    this.users.set(key, user);
    return user;
  }

  async update(
    id: string,
    updateUserDTO: UpdateUserDto,
  ): Promise<UserEntity | null> {
    const user: UserEntity | null = await this.getOne(id);
    if (!user) return null;
    user.password = updateUserDTO.newPassword;
    user.updatedAt = Number(new Date());
    user.version += 1;
    this.users.set(id, user);
    return user;
  }

  async delete(id: string): Promise<void> {
    const user: UserEntity | null = await this.getOne(id);
    if (!user) return null;
    this.users.delete(id);
    return;
  }
}
