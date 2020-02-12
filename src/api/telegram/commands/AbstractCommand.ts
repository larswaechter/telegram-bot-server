import nodeTelegramBotApi from 'node-telegram-bot-api';

export interface ICommand {
	command: RegExp;
	register(bot: nodeTelegramBotApi): void;
}

export abstract class AbstractCommand {}
