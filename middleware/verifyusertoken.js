const jwt = require('jsonwebtoken');

exports.verifyUserToken = async (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader.split(' ')[1];
	if (token == null) return res.sendStatus(401);
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403);
		req.role = decoded.role;
		req.userId = decoded.userId;
		next();
	});
};
