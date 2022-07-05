const models = require('../models');
const tbl_anggota = models.tbl_anggota;
const jwt = require('jsonwebtoken');

// Refresh Token setelah login diambil dari refreshToken database

exports.refreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) return res.sendStatus(403);
		const user = await tbl_anggota.findAll({
			where: {
				refresh_token: refreshToken,
			},
		});
		if (!user[0]) return res.sendStatus(403);
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
			if (err) return res.sendStatus(403);
			const userId = user[0].id;
			const nama = user[0].nama;
			const email = user[0].email;
			const role = user[0].role;
			const accessToken = jwt.sign({ userId, nama, email, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '17s' });
			res.json({ accessToken });
		});
	} catch (error) {
		console.log(error);
	}
};
