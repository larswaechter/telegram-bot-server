import 'reflect-metadata';
import 'source-map-support/register';

import { config } from 'dotenv';

// Load environment variables from .env file
config();

import { Application } from 'express';
import { createServer, Server } from 'http';
import { MongoError } from 'mongodb';
import { connect } from 'mongoose';

import { logger } from './config/logger';
import { globals } from './config/variables';

import { ExpressServer } from './api/rest/server';

// Connect to database
connect(
	globals.database.url,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	(err: MongoError) => {
		if (err) {
			logger.error(err.message);
			throw err;
		}

		// Init express server
		const app: Application = new ExpressServer().app;
		const server: Server = createServer(app);

		server.on('listening', () => {
			logger.info(`${globals.bot.name} telegram-bot-server is running on port ${globals.port} in ${globals.env} mode`);
		});

		server.listen(globals.port);
	}
);
