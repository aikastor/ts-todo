import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt.payload.interface';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

// injectable class
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    // fetch user
    const { username } = payload;
    const user: User = await this.usersRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
