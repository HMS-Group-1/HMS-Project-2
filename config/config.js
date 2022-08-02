require('dotenv').config();
module.exports = {
	development: {
		username: process.env.USER,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
		host: process.env.HOST,
		dialect: process.env.DIALECT,
		timezone: '+07:00',
	},
	test: {
		username: 'root',
		password: null,
		database: 'database_test',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
	production: {
		username: 'root',
		password: null,
		database: 'database_production',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
};
