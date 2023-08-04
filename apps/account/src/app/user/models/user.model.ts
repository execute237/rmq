import { Document } from 'mongoose';
import { IUser, UserRole } from '@micro/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document implements IUser {
	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	passwordHash: string;

	@Prop()
	displayName?: string;

	@Prop({ required: true, enum: UserRole, type: String, default: UserRole.Student })
	role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);