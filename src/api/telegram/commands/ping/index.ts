import nodeTelegramBotApi from 'node-telegram-bot-api';
import { ICommand, AbstractCommand } from '../AbstractCommand';

/**
 *  /ping command
 */

export class PingCommand extends AbstractCommand implements ICommand {
	command: RegExp = /\/ping/;

	public register(bot: nodeTelegramBotApi): void {
		bot.onText(this.command, async (msg) => {
			bot.sendMessage(msg.chat.id, 'PING BACK!');
		});
	}
}
