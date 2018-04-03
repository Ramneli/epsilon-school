import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
	messages: string[] = [];s

	add(message: string) {
		this.messages.push(message);
	}

	clear() {
		this.messages = [];
	}
}
