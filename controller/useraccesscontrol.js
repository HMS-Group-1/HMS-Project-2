const models = require('../models');
const tbl_anggota = models.tbl_anggota;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Registrasi USER
exports.Register = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}
	const { nama, email, password, no_telp, role } = req.body;
	console.log('role adalah ' + req.body.role);
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);
	try {
		await tbl_anggota.create({
			nama: nama,
			email: email,
			password: hashPassword,
			no_telp: no_telp,
			role: role,
		});
		res.json({ message: 'Registrasi Berhasil' });
	} catch (error) {
		res.status(400).json({ message: 'Registrasi Gagal!' });
	}
};

// Login USER
exports.Login = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}
	try {
		const user = await tbl_anggota.findAll({
			where: {
				email: req.body.email,
			},
		});
		const match = await bcrypt.compare(req.body.password, user[0].password);
		if (!match) return res.status(400).json({ message: 'Email atau password salah!' });
		const userId = user[0].id;
		const nama = user[0].nama;
		const email = user[0].email;
		const role = user[0].role;
		const accessToken = jwt.sign({ userId, nama, email, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '22s' });
		const refreshToken = jwt.sign({ userId, nama, email, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
		await tbl_anggota.update(
			{ refresh_token: refreshToken },
			{
				where: {
					id: userId,
				},
			}
		);
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
			allowCredentials: true,
		});
		res.send({ accessToken });
		res.end();
	} catch (error) {
		res.status(404).json({ message: 'Email atau password salah!' });
	}
};

// Logout USER
exports.Logout = async (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) return res.sendStatus(204);
	const user = await tbl_anggota.findAll({
		where: {
			refreshToken: refreshToken,
		},
	});
	if (!user[0]) return res.sendStatus(204);
	const userId = user[0].id;
	await tbl_anggota.update(
		{
			refreshToken: null,
		},
		{
			where: {
				id: userId,
			},
		}
	);
	res.clearCookie('refreshToken');
	return res.sendStatus(200);
};
