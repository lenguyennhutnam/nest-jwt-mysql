import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/helpers/bcrypt.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { email, password } = createUserDto;
      createUserDto.password = await hashPassword(password);
      const newUser = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(newUser);
      return `User ${email} is created`;
    } catch (e) {
      return { error: e };
    }
  }

  async findAll() {
    const userList = this.usersRepository.find();
    return userList;
  }

  async findOne(id: any) {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      await this.usersRepository.update(user, updateUserDto);
      return `User ${user.email} updated`;
    } catch (e) {
      return e;
    }
  }

  async remove(id: number) {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return 'User deleted successfully';
  }
}
