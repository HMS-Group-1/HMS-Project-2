const { Op } = require('sequelize');
const models = require('../models');
const tbl_buku = models.tbl_buku;
const tbl_kategori = models.tbl_kategori;
const { validationResult } = require('express-validator');

// untuk ambil data buku
exports.getBooks = async (req, res) => {
	try {
		const books = await tbl_buku.findAll();
		res.status(200).json(books);
	} catch (error) {
		console.log(error);
	}
};

// untuk ambil data paginasi daftar buku
exports.getBooksPaginated = async (req, res) => {
	const pageAt = parseInt(req.query.page) || 0;
	const limitPage = parseInt(req.query.limit) || 15;
	const searchQuery = req.query.search_query || '';
	const offset = limitPage * pageAt;

	const jumlahBaris = await tbl_buku.count({
		where: {
			[Op.or]: [
				{
					judul_buku: {
						[Op.like]: '%' + searchQuery + '%',
					},
				},
				{
					deskripsi: {
						[Op.like]: '%' + searchQuery + '%',
					},
				},
			],
		},
	});

	const jumlahHalaman = Math.ceil(jumlahBaris / limitPage);
	const hasil = await tbl_buku.findAll({
		where: {
			[Op.or]: [
				{
					judul_buku: {
						[Op.like]: '%' + searchQuery + '%',
					},
				},
				{
					deskripsi: {
						[Op.like]: '%' + searchQuery + '%',
					},
				},
			],
		},
		offset: offset,
		limit: limitPage,
		order: [['createdAt', 'DESC']],
	});

	res.json({
		hasilBuku: hasil,
		halamanKe: pageAt,
		jumlahBaris: jumlahBaris,
		jumlahHalaman: jumlahHalaman,
	});
};

// ambil data buku dengan kategori
exports.categoryWithBooks = async (req, res) => {
	try {
		const books = await tbl_buku.findAll({ order: [['id', 'ASC']], include: [{ model: tbl_kategori, as: 'Kategori_id', required: true }] });
		res.status(200).json(books);
	} catch (error) {
		console.log(error);
	}
};

exports.categoryWithBooksById = async (req, res) => {
	try {
		const booksById = await tbl_buku.findOne({
			where: {
				id: req.params.id,
			},
			include: [{ model: tbl_kategori, as: 'Kategori_id', required: true }],
		});
		res.status(200).json(booksById);
	} catch (error) {
		console.log(error);
	}
};

// untuk ambil data buku satu per satu
exports.getBookById = async (req, res) => {
	try {
		const bookById = await tbl_buku.findOne({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json(bookById);
	} catch (error) {
		console.log(error);
	}
};

// untuk create data buku
exports.createBooks = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}
	const gambar = req.files.gambar[0].data;
	const { judul_buku, kategori_id, deskripsi, stok, rak_id, tahun_terbit } = req.body;
	try {
		await tbl_buku.create({
			judul_buku: judul_buku,
			kategori_id: kategori_id,
			deskripsi: deskripsi,
			gambar: gambar,
			stok: stok,
			rak_id: rak_id,
			tahun_terbit: tahun_terbit,
		});
		res.status(201).json({ message: 'Book created' });
	} catch (error) {
		console.log(error.message);
	}
};

// untuk update data buku

exports.updateBooks = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}
	const theBook = await tbl_buku.findOne({
		where: {
			id: req.params.id,
		},
	});
	if (!theBook) return res.status(404).json({ message: 'No book found' });
	let gambar = '';
	if (req.files == null) {
		gambar = theBook.gambar;
	} else {
		gambar = req.files.gambar[0].data;
	}

	const { judul_buku, kategori_id, deskripsi, stok, rak_id, tahun_terbit } = req.body;
	try {
		await tbl_buku.update(
			{
				judul_buku: judul_buku,
				kategori_id: kategori_id,
				deskripsi: deskripsi,
				gambar: gambar,
				stok: stok,
				rak_id: rak_id,
				tahun_terbit: tahun_terbit,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		res.status(200).json({ message: 'Book Updated' });
	} catch (error) {
		console.log(error);
	}
};

// untuk delete buku

exports.deleteBooks = async (req, res) => {
	try {
		await tbl_buku.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ message: 'Book deleted' });
	} catch (error) {
		console.log(error.message);
	}
};
