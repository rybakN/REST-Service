import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from '../entity-repository/entity/UsersRepository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly users: UsersRepository) {}
  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.users.create(createUserDto);
  }

  public async findAll(): Promise<UserEntity[]> {
    return await this.users.getAll();
  }

  public async findOne(id: string): Promise<UserEntity> {
    return await this.users.getOne(id);
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | null | boolean> {
    const user: UserEntity | null = await this.findOne(id);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(
      updateUserDto.oldPassword,
      user.password,
    );
    if (passwordValid) return false;
    return this.users.update(id, updateUserDto);
  }

  public async remove(id: string): Promise<void | null> {
    const user: UserEntity | null = await this.findOne(id);
    if (!user) return null;
    return await this.users.delete(id);
  }

  async getUser(param: { login: string }): Promise<UserEntity> {
    return this.users.getUser(param);
  }
}
