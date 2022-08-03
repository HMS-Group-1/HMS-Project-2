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
	const user = await tbl_anggota.findOne({
		where: {
			email: req.body.email,
		},
	});
	if (user) return res.status(422).json({ message: 'Email telah terdaftar' });
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
	if (!refreshToken) return res.sendStatus(204).json();
	const user = await tbl_anggota.findAll({
		where: {
			refresh_token: refreshToken,
		},
	});
	if (!user[0]) return res.sendStatus(204).json();
	const userId = user[0].id;
	await tbl_anggota.update(
		{
			refresh_token: null,
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

exports.getUserById = async (req, res) => {
	try {
		const anggota = await tbl_anggota.findOne({
			where: {
				id: req.userId,
			},
		});
		console.log(req.userId);
		res.status(200).json(anggota);
	} catch (error) {
		console.log(error);
	}
};

exports.updateUser = async (req, res) => {
	try {
		const { nama, email, no_telp } = req.body;

		const findUser = await tbl_anggota.findOne({
			where: {
				id: req.userId,
			},
		});

		if (!findUser) return res.status(404).json('User tidak ada!');

		await tbl_anggota.update(
			{
				nama: nama,
				email: email,
				no_telp: no_telp,
			},
			{
				where: {
					id: req.userId,
				},
			}
		);

		res.status(200).json('Berhasil update');
	} catch (error) {
		console.log(error);
	}
};

exports.changePassword = async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body;
		const findUser = await tbl_anggota.findOne({
			where: {
				id: req.userId,
			},
		});
		if (!findUser) return res.status(404).json('User tidak ada!');
		const match = await bcrypt.compare(oldPassword, findUser.password);
		console.log(match);
		if (!match) return res.status(400).json('Password tidak cocok!');
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		await tbl_anggota.update(
			{
				password: hashedPassword,
			},
			{ where: { id: req.userId } }
		);
		res.status(200).json('Password berhasil diubah');
	} catch (error) {
		console.log(error);
	}
};
