import { IUser, UserRole } from '@micro/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUser {
	_id?: string;
	email: string;
	passwordHash: string;
	displayName?: string;
	role: UserRole;

	constructor(user: IUser) {
		this._id = user._id;
		this.displayName = user.displayName;
		this.passwordHash = user.passwordHash;
		this.email = user.email;
		this.role = user.role;
	}

	async setPassword(password: string) {
		const salt = await genSalt();
		this.passwordHash = await hash(password, salt);
		return this;
	}

	async validatePassword(password: string) {
		return compare(password, this.passwordHash);
	}
}
