export const globals = {
	bot: {
		name: 'Jarvis',
		clients: [process.env.TELEGRAM_CHAT_ID]
	},
	database: {
		url: process.env.MONGODB_URL || 'mongodb://localhost/telegram-api-server'
	},
	env: process.env.NODE_ENV,
	keys: {
		jwt: process.env.JWT_SECRET || 'mysecretjwt007',
		telegram: process.env.TELEGRAM_BOT_KEY || ''
	},
	port: process.env.NODE_PORT || 3000
};
