# telegram-bot-server

An extendable webserver for communication with the Telegram Bot API.

## Description

telegram-bot-server is a Node.js powered webserver with MongoDB integration for running your own [Telegram Bot](https://core.telegram.org/bots) as well as a REST API.

You can easliy integrate your own bot commands into the current system. See the `Commands` section for more information.

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

## Commands

WIP

## License

telegram-bot-server is released under [MIT](https://github.com/larswaechter/telegram-bot-server/blob/master/LICENSE) license.
