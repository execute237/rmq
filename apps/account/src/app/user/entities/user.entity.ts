import { IDomainEvent, IUser, IUserCourses, PurchaseState, UserRole } from '@micro/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';
import { AccountChangedCourse } from '@micro/contracts';

export class UserEntity implements IUser {
	_id?: string;
	email: string;
	passwordHash: string;
	role: UserRole;
	displayName?: string;
	courses?: IUserCourses[];
	events: IDomainEvent[] = [];

	constructor(user: IUser) {
		this._id = user._id;
		this.email = user.email;
		this.passwordHash = user.passwordHash;
		this.role = user.role;
		this.displayName = user.displayName;
		this.courses = user.courses;
	}

	setCourseStatus(courseId: string, state: PurchaseState) {
		const exist = this.courses.find((c) => c.courseId === courseId);
		if (!exist) {
			this.courses.push({
				courseId,
				purchaseState: state,
			});
			return this;
		}

		if (state === PurchaseState.Cancelled) {
			this.courses = this.courses.filter((c) => c.courseId !== courseId);
			return this;
		}

		this.courses = this.courses.map((c) => {
			if (c.courseId === courseId) {
				c.purchaseState = state;
				return c;
			}
			return c;
		});
		this.events.push({
			topic: AccountChangedCourse.topic,
			data: { courseId, userId: this._id, state },
		});
		return this;
	}

	getCourseState(courseId: string): PurchaseState {
		return (
			this.courses.find((c) => c.courseId === courseId)?.purchaseState ?? PurchaseState.Started
		);
	}

	async setPassword(password: string) {
		const salt = await genSalt();
		this.passwordHash = await hash(password, salt);
		return this;
	}

	async validatePassword(password: string) {
		return compare(password, this.passwordHash);
	}

	updateProfile(displayName: string) {
		this.displayName = displayName;
		return this;
	}
}
