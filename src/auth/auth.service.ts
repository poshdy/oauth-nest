import { Injectable } from '@nestjs/common';
import { UserData } from './dto/user-data';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async authenticateUser(userData: UserData) {
    const { email, username } = userData;
    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      let updatedUser = {
        email,
        username,
      };
      return await this.userRepository.save(updatedUser);
    } else {
      let newUser = this.userRepository.create(userData);

      return await this.userRepository.save(newUser);
    }
  }

  async findUser(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
