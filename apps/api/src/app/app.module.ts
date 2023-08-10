import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './config/rmq.config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './controllers/user.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: 'envs/.api.env', isGlobal: true }),
		RMQModule.forRootAsync(getRMQConfig()),
		JwtModule.registerAsync(getJwtConfig()),
		PassportModule,
		ScheduleModule.forRoot(),
	],
	controllers: [AuthController, UserController],
})
export class AppModule {}
