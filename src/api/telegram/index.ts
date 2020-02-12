import nodeTelegramBotApi from 'node-telegram-bot-api';

import { globals } from '../../config/variables';

export class TelegramApi {
	private name: string = globals.bot.name;
	private bot: nodeTelegramBotApi = new nodeTelegramBotApi(globals.keys.telegram, { polling: true });

	public constructor() {
		this.registerChatCommands();
	}

	/**
	 * Register Telegram commands
	 */
	private registerChatCommands(): void {
		/**
		 * TODO: Enter chat commands here
		 */
		this.startChat();
	}

	/**
	 * Triggered on chat opening with bot
	 */
	private startChat(): void {
		const startMsg = `Hello! My name is ${this.name}. How can I help you?`;

		this.bot.onText(/\/start/, (msg) => {
			this.bot.sendMessage(msg.chat.id, startMsg);
		});
	}
}
