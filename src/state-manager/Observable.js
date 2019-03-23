import {isEmpty} from './utils';

export default class Observable {
	constructor() {
		this.observers = [];
	}

	isExist(func) {
		return this.observers.some(observer => observer === func);
	}

	subscribe(func) {
		if (!isEmpty(func) && !this.isExist(func)) {
			this.observers.push(func);
		}
	}

	unsubscribe(func) {
		this.observers = this.observers.filter(observer => observer !== func);
	}

	notify(callback) {
		this.observers.forEach(observer => {
			callback(observer);
		});
	}
}