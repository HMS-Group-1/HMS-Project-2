const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./route/routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

app.listen(process.env.SERVER_PORT, () => {
	console.log('Server running');
});
