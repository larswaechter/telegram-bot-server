import nodeTelegramBotApi from 'node-telegram-bot-api';
import { bind } from 'decko';

import { TelegramApi } from '..';

export interface ICommand {
	exec(msg: nodeTelegramBotApi.Message, match: RegExpExecArray | null): void;
}

export abstract class AbstractCommand {
	protected bot: nodeTelegramBotApi;
	private command: RegExp;
	private doAuthentication: boolean;

	/**
	 * @param bot nodeTelegramBotApi instance
	 * @param command Regex that matches the command
	 * @param doAuthentication Do authentication for user
	 */
	public constructor(bot: nodeTelegramBotApi, command: RegExp, doAuthentication: boolean = true) {
		this.bot = bot;
		this.command = command;
		this.doAuthentication = doAuthentication;
	}

	public register(): void {
		this.bot.onText(this.command, this.authorize);
	}

	/**
	 * Execute command
	 * Must be overridden in child class
	 *
	 * @param msg
	 * @param match
	 */
	public abstract exec(msg: nodeTelegramBotApi.Message, match: RegExpExecArray | null): void;

	/**
	 * Authorize bot user and bot command action
	 *
	 * @param msg Telegram Message
	 * @param match Telegram Message Match
	 */
	@bind
	private authorize(msg: nodeTelegramBotApi.Message, match: RegExpExecArray | null): void {
		if (!this.doAuthentication || (this.doAuthentication && TelegramApi.clients.includes(msg.chat.id.toString()))) {
			return this.exec(msg, match);
		}

		this.bot.sendMessage(msg.chat.id, 'User not authorized!');
	}
}
