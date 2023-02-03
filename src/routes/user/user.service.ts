import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Db } from '../utils/DB/db';
import { UserEntity } from './entities/user.entity';
import { ChangeUserDTO } from '../utils/DB/entity/DBUsers';

@Injectable()
export class UserService {
  private db = new Db();
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.db.users.create(createUserDto);
  }

  async findAll() {
    return await this.db.users.getAll();
  }

  async findOne(id: string) {
    return await this.db.users.getOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user: UserEntity | null | boolean = await this.findOne(id);
    if (!user) return null;
    if (user.password !== updateUserDto.oldPassword) return false;
    const changeDTO: ChangeUserDTO = {
      password: updateUserDto.newPassword,
      updatedAt: Number(new Date()),
      version: user.version + 1,
    };
    return this.db.users.change(id, changeDTO);
  }

  async remove(id: string): Promise<UserEntity | null> {
    const user: UserEntity | null = await this.findOne(id);
    if (!user) return null;
    return await this.db.users.delete(id);
  }

  deletePassword(user: UserEntity): Omit<UserEntity, 'password'> {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
