# telegram-bot-server

An extendable webserver for communication with the Telegram Bot API.

## Description

telegram-bot-server is a Node.js powered webserver with MongoDB integration for running your own [Telegram Bot](https://core.telegram.org/bots) as well as a REST API. It provides one example bot command innately but you can easily integrate your own ones into the current system.

See the `Commands` section for more information.

## Prerequisites

- Node.js
- MongoDB
- Telegram Bot

## Installation

First of all, create a new MongoDB database:

```
use telegram-api-server
```

Afterwards, copy the environment file and enter your secret information:

```bash
cp .env.example .env
```

Now, run the following commands to install the node modules and start the webserver:

```
yarn install
yarn build
yarn start
```

## Usage

WIP

## Commands

The following describes how you can create and add an own command to the current system. Commands are triggered via the Telegram chat by sending `/YourCommand` to your bot.

You can find more information about Telegram bots and commands [here](https://core.telegram.org/bots) and [here](https://core.telegram.org/bots#commands).

---

First, create a new directory and file for your new command:

(Replace `{YourCommand}` with your desired command name)

```bash
 mkdir ./src/api/telegram/commands/{YourCommand}
 touch ./src/api/telegram/commands/{YourCommand}/index.ts
```

---

Next, open the new created file for your command and enter its code:

(Again: Replace `YourCommand` with your desired command name)

```typescript
import nodeTelegramBotApi from 'node-telegram-bot-api';

import { ICommand, AbstractCommand } from '../AbstractCommand';

/**
 *  /YourCommand command
 */

export class YourCommand extends AbstractCommand implements ICommand {
	public constructor(bot: nodeTelegramBotApi) {
		super(bot /* Enter here a RegEx that matches your command */);
	}

	public exec(msg: nodeTelegramBotApi.Message, match: RegExpExecArray | null): void {
		// Enter here your command's behavior when it's called inside a Telegram chat

		// Send the response (if desired) to the client
		this.bot.sendMessage(msg.chat.id /* response msg */);
	}
}
```

The method `exec` get's automatically called by the Telegram API when you use your command inside a chat. Enter here the command's behavior and send a response back to the client if desired.

---

Last but not least register the new created command in `./src/api/telegram/index.ts`.

First of all, import the command class from above at the file's top:

```typescript
import { YourCommand } from './commands/YourCommand';
```

And create new instance of it inside `TelegramApi`'s constructor:

```typescript
new YourCommand(this.bot).register();
```

That's it! You created your own bot command.

Now, when you call your command inside a Telegram Chat: `/YourCommand` your code should be executed.

## License

telegram-bot-server is released under [MIT](https://github.com/larswaechter/telegram-bot-server/blob/master/LICENSE) license.
