import nodeTelegramBotApi from 'node-telegram-bot-api';

import { ICommand, AbstractCommand } from '../AbstractCommand';

/**
 *  /ping command
 */

export class PingCommand extends AbstractCommand implements ICommand {
	public constructor(bot: nodeTelegramBotApi) {
		super(bot, /\/ping/);
	}

	public action(msg: nodeTelegramBotApi.Message, match: RegExpExecArray | null): void {
		this.bot.sendMessage(msg.chat.id, 'PING BACK!');
	}
}
