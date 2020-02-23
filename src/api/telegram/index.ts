import nodeTelegramBotApi from 'node-telegram-bot-api';

import { globals } from '../../config/variables';

import { PingCommand } from './commands/ping';

export class TelegramApi {
	private name: string = globals.bot.name;
	private bot: nodeTelegramBotApi = new nodeTelegramBotApi(globals.keys.telegram, { polling: true });

	// Array of Chat IDs for authorized users
	public static clients: (string | undefined)[] = globals.bot.clients;

	public constructor() {
		this.registerChatCommands();
	}

	/**
	 * Register Telegram commands
	 */
	private registerChatCommands(): void {
		new PingCommand(this.bot).register();

		// Welcome message
		this.startChat();
	}

	/**
	 * Triggered on chat opening with bot
	 */
	private startChat(): void {
		const startMsg: string = `Hello! My name is ${this.name}. How can I help you?`;

		this.bot.onText(/\/start/, (msg) => {
			this.bot.sendMessage(msg.chat.id, startMsg);
		});
	}
}
