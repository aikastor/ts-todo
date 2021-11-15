import {
	ConflictException,
	InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

// to handle errors more gracefully:
// define enum i.e userErrors
// make service throw errors
@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		const { username, password } = authCredentialsDto;

		// hash and store
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = this.create({ username, password: hashedPassword });

		try {
			await this.save(user);
		} catch (error) {
			//duplicate username
			if (error.code === '23505') {
				throw new ConflictException('Username already exists');
			} else {
				throw new InternalServerErrorException();
			}
		}
	}
}
