import express from 'express';

import { TelegramApi } from './telegram';
import { registerMiddleware, registerErrorHandler } from './rest/middleware';

export class ExpressServer {
	private readonly _app: express.Application = express();
	private readonly _bot: TelegramApi = new TelegramApi();

	public constructor() {
		registerMiddleware(this._app);
		registerErrorHandler(this._app);
	}

	/**
	 * Returns Express application
	 *
	 * @returns Express app
	 */
	public get app(): express.Application {
		return this._app;
	}
}
