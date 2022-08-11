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
		username: 'b9cef5082c7e35',
		password: '10638988',
		database: 'heroku_c5a85ac24f1d401',
		host: 'eu-cdbr-west-03.cleardb.net',
		dialect: 'mysql',
	},
};
