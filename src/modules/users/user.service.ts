import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {

    constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(object: Partial<User>): Promise<User> {
    return this.userRepository.findOne(object)
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }

  async create(user?: User): Promise<User>  {
    return this.userRepository.save(user)
  }


  getHello(): string {
    return 'Hello World!';
  }
}
