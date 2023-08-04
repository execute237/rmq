export enum UserRole {
	Teacher = 'Teacher',
	Student = 'Student',
}

export interface IUser {
	_id?: string;
	email: string;
	passwordHash: string;
	displayName?: string;
	role: UserRole;
}
