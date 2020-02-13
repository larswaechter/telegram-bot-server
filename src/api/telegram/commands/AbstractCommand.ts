import nodeTelegramBotApi from 'node-telegram-bot-api';
import { bind } from 'decko';

import { TelegramApi } from '..';

export interface ICommand {
	action(msg: nodeTelegramBotApi.Message, match: RegExpExecArray | null): void;
}

export abstract class AbstractCommand {
	protected bot: nodeTelegramBotApi;
	private command: RegExp;

	public constructor(bot: nodeTelegramBotApi, command: RegExp) {
		this.bot = bot;
		this.command = command;
	}

	public register(): void {
		this.bot.onText(this.command, this.isAuthorized);
	}

	/**
	 * Command action
	 * Must be overridden in child class
	 *
	 * @param msg
	 * @param match
	 */
	public abstract action(msg: nodeTelegramBotApi.Message, match: RegExpExecArray | null): void;

	/**
	 * Authorize bot user
	 *
	 * @param msg Telegram Message
	 * @param match Telegram Message Match
	 */
	@bind
	private isAuthorized(msg: nodeTelegramBotApi.Message, match: RegExpExecArray | null): void {
		if (TelegramApi.clients.includes(msg.chat.id.toString())) {
			return this.action(msg, match);
		}

		this.bot.sendMessage(msg.chat.id, 'User not authorized!');
	}
}
