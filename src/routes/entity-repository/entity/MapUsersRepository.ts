import { UserEntity } from '../../user/entities/user.entity';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UpdateUserDto } from '../../user/dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from '../interface/EntityRepository';
import { MapEntityRepository } from './MapEntityRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MapUsersRepository
  extends MapEntityRepository<UserEntity, CreateUserDto, UpdateUserDto>
  implements EntityRepository<UserEntity, CreateUserDto, UpdateUserDto>
{
  constructor(
    @InjectRepository(UserEntity) protected userRepo: Repository<UserEntity>,
  ) {
    super(userRepo);
  }
  public async create(createUserDTO: CreateUserDto): Promise<UserEntity> {
    const now = Number(new Date());
    const user: Omit<UserEntity, 'id'> = {
      ...createUserDTO,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    return this.userRepo.save(user);
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
