import { UserEntity } from '../../user/entities/user.entity';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UpdateUserDto } from '../../user/dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from '../interface/EntityRepository';
import { AbstractEntityRepository } from './AbstractEntityRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as process from 'process';

@Injectable()
export class UsersRepository
  extends AbstractEntityRepository<UserEntity, CreateUserDto, UpdateUserDto>
  implements EntityRepository<UserEntity, CreateUserDto, UpdateUserDto>
{
  cryptSalt: number;
  constructor(
    @InjectRepository(UserEntity) protected userRepo: Repository<UserEntity>,
  ) {
    super(userRepo);
    this.cryptSalt = +process.env.CRYPT_SALT || 10;
  }
  public async create(createUserDTO: CreateUserDto): Promise<UserEntity> {
    const now = Number(new Date());
    const user: Omit<UserEntity, 'id'> = {
      ...createUserDTO,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    user.password = await bcrypt.hash(user.password, this.cryptSalt);
    return this.userRepo.save(user);
  }

  public async update(
    id: string,
    updateUserDTO: UpdateUserDto,
  ): Promise<UserEntity | null> {
    const user: UserEntity | null = await this.getOne(id);
    if (!user) return null;
    user.password = await bcrypt.hash(
      updateUserDTO.newPassword,
      this.cryptSalt,
    );
    user.updatedAt = Number(new Date());
    user.createdAt = Number(user.createdAt);
    user.version += 1;
    const option: FindOptionsWhere<UserEntity> = {
      id: id,
    } as FindOptionsWhere<UserEntity>;
    await this.userRepo.update(option, user);
    return user;
  }
  public async getFavorites(): Promise<UserEntity[]> {
    return this.userRepo.find();
  }

  public async getUser(param: { login: string }): Promise<UserEntity> {
    return this.userRepo.findOneBy({ login: param.login });
  }
}
