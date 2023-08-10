import { RMQService } from 'nestjs-rmq';
import { UserEntity } from '../entities/user.entity';
import { PurchaseState } from '@micro/interfaces';
import { BuyCourseSagaState } from './buy-course.state';
import {
	BuyCourseSagaStateCancelled,
	BuyCourseSagaStateWaiting,
	BuyCourseSagaStatePurchased,
	BuyCourseSagaStateStarted,
} from './buy-course.steps';

export class BuyCourseSaga {
	private state: BuyCourseSagaState;

	constructor(
		public user: UserEntity,
		public courseId: string,
		public rmqService: RMQService,
	) {
		this.setState(user.getCourseState(courseId), courseId);
	}

	setState(state: PurchaseState, courseId: string) {
		switch (state) {
			case PurchaseState.Started:
				this.state = new BuyCourseSagaStateStarted();
				break;
			case PurchaseState.WaitingForPayment:
				this.state = new BuyCourseSagaStateWaiting();
				break;
			case PurchaseState.Purchased:
				this.state = new BuyCourseSagaStatePurchased();
				break;
			case PurchaseState.Cancelled:
				this.state = new BuyCourseSagaStateCancelled();
				break;
		}
		this.state.setContext(this);
		this.user.setCourseStatus(courseId, state);
	}

	getState() {
		return this.state;
	}
}
