const models = require('../models');
const tbl_anggota = models.tbl_anggota;
const tbl_peminjaman = models.tbl_peminjaman;
const tbl_pengembalian = models.tbl_pengembalian;
const { validationResult } = require('express-validator');

// GET USERS
exports.getAllUsers = async (req, res) => {
	try {
		const response = await tbl_anggota.findAll();
		res.json(response);
	} catch (error) {
		console.log(error.message);
	}
};

// GET USERS BY ID
exports.getUserById = async (req, res) => {
	try {
		const response = await tbl_anggota.findOne({
			where: {
				id: req.params.id,
			},
		});
		res.json(response);
	} catch (error) {
		console.log(error);
	}
};

// UPDATE USERS
exports.updateUsers = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}
	try {
		await tbl_anggota.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ message: 'User Updated' });
	} catch (error) {
		console.log(error.message);
	}
};

// DELETE USERS
exports.deleteUsers = async (req, res) => {
	try {
		await tbl_anggota.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ message: 'User Deleted' });
	} catch (error) {
		console.log(error.message);
	}
};

// List Peminjaman
exports.listPinjamAdmin = async (req, res) => {
	try {
		const listPinjam = await tbl_peminjaman.findAll({
			order: [['createdAt', 'DESC']],
		});
		res.status(200).json(listPinjam);
	} catch (error) {
		console.log(error);
	}
};

// List Pengembalian
exports.listPengembalianAdmin = async (req, res) => {
	try {
		const listPengembalian = await tbl_pengembalian.findAll({
			order: [['createdAt', 'DESC']],
		});
		res.status(200).json(listPengembalian);
	} catch (error) {
		console.log(error);
	}
};
