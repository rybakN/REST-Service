import { UserEntity } from '../../user/entities/user.entity';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UpdateUserDto } from '../../user/dto/update-user.dto';
import { v4 as uuidV4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from '../interface/EntityRepository';
import { MapEntityRepository } from './MapEntityRepository';

@Injectable()
export class MapUsersRepository
  extends MapEntityRepository<UserEntity, CreateUserDto, UpdateUserDto>
  implements EntityRepository<UserEntity, CreateUserDto, UpdateUserDto>
{
  public async create(createUserDTO: CreateUserDto): Promise<UserEntity> {
    const key: string = uuidV4();
    const now = Number(new Date());
    const user: UserEntity = {
      ...createUserDTO,
      id: key,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    this.entities.set(key, user);
    return user;
  }

  public async update(
    id: string,
    updateUserDTO: UpdateUserDto,
  ): Promise<UserEntity | null> {
    const user: UserEntity | null = await this.getOne(id);
    if (!user) return null;
    user.password = updateUserDTO.newPassword;
    user.updatedAt = Number(new Date());
    user.version += 1;
    this.entities.set(id, user);
    return user;
  }
}
