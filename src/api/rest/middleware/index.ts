import { json, Request, Response, NextFunction, Router } from 'express';

import helmet from 'helmet';

/**
 * Register express.js middleware
 *
 * @param router express.js router instance
 */
export function registerMiddleware(router: Router): void {
	router.use(helmet());
	router.use(json());
}

/**
 * Register express.js error handler
 *
 * @param router express.js router instance
 */
export function registerErrorHandler(router: Router): Response | void {
	router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		return res.status(500).json({
			error: err.message || err,
			status: 500
		});
	});
}
