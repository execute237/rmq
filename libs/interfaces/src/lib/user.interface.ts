export enum UserRole {
	Teacher = 'Teacher',
	Student = 'Student',
}
export enum PurchaseState {
	Started = 'Started',
	WaitingForPayment = 'WaitingForPayment',
	Purchased = 'Purchased',
	Cancelled = 'Cancelled',
}

export interface IUser {
	_id?: string;
	email: string;
	passwordHash: string;
	displayName?: string;
	role: UserRole;
	courses?: IUserCourses[];
}

export interface IUserCourses {
	courseId: string;
	purchaseState: PurchaseState;
}
