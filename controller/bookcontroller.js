const { Op } = require('sequelize');
const models = require('../models');
const tbl_buku = models.tbl_buku;
const tbl_kategori = models.tbl_kategori;
const tbl_peminjaman = models.tbl_peminjaman;
const tbl_pengembalian = models.tbl_pengembalian;
const tbl_rak = models.tbl_rak;
const { validationResult } = require('express-validator');

const now = new Date();
const today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
const stringToBoolean = (input) => {
	switch (input) {
		case 'true':
			return true;

		case 'false':
			return false;
	}
};

// untuk ambil data buku
exports.getBooks = async (req, res) => {
	try {
		const books = await tbl_buku.findAll({
			order: [['createdAt', 'DESC']],
		});
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
						[Op.like]: '%' + searchQuery,
					},
				},
				{
					deskripsi: {
						[Op.like]: '%' + searchQuery,
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
						[Op.like]: '%' + searchQuery,
					},
				},
				{
					deskripsi: {
						[Op.like]: '%' + searchQuery,
					},
				},
			],
		},
		attributes: { exclude: 'kategori_id' },
		offset: offset,
		limit: limitPage,
		order: [['createdAt', 'DESC']],
		include: [
			{ model: tbl_peminjaman, attributes: ['isPinjam'], where: { anggota_id: req.userId }, order: [['createdAt', 'DESC']], limit: 1 },
			{ model: tbl_kategori, as: 'Kategori_id', attributes: ['kategori_nama'] },
		],
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
			include: [{ model: tbl_peminjaman, attributes: ['isPinjam'], where: { anggota_id: req.userId }, order: [['createdAt', 'DESC']], limit: 1, required: true, all: true }],
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

// List pinjam buku
exports.listPinjamBuku = async (req, res) => {
	const pageAt = parseInt(req.query.page) || 0;
	const limitPage = parseInt(req.query.limit) || 10;
	const searchQuery = req.query.search_query || '';
	const kategori = req.query.kategori || '';
	const rak = req.query.rak || '';
	const isPinjam = stringToBoolean(req.query.isPinjam);
	console.log(isPinjam);
	const offset = limitPage * pageAt;

	try {
		const jumlahBaris = await tbl_peminjaman.count({
			where: {
				anggota_id: req.userId,
				isPinjam: isPinjam,
			},
			required: true,
			include: [
				{
					model: tbl_buku,
					attributes: ['judul_buku'],
					where: {
						judul_buku: {
							[Op.like]: '%' + searchQuery + '%',
						},
					},
					include: [
						{
							model: tbl_kategori,
							as: 'Kategori_id',
							attributes: ['kategori_nama'],
							where: {
								kategori_nama: {
									[Op.like]: '%' + kategori + '%',
								},
							},
						},
						{
							model: tbl_rak,
							as: 'Rak_id',
							attributes: ['lokasi_rak'],
							where: {
								lokasi_rak: { [Op.like]: '%' + rak + '%' },
							},
						},
					],
				},
			],
		});

		const jumlahHalaman = Math.ceil(jumlahBaris / limitPage);
		const hasil = await tbl_peminjaman.findAll({
			where: {
				anggota_id: req.userId,
				isPinjam: isPinjam,
			},
			required: true,
			include: [
				{
					model: tbl_buku,
					attributes: ['judul_buku'],
					where: {
						judul_buku: {
							[Op.like]: '%' + searchQuery + '%',
						},
					},
					include: [
						{
							model: tbl_kategori,
							as: 'Kategori_id',
							attributes: ['kategori_nama'],
							where: {
								kategori_nama: {
									[Op.like]: '%' + kategori + '%',
								},
							},
						},
						{
							model: tbl_rak,
							as: 'Rak_id',
							attributes: ['lokasi_rak'],
							where: {
								lokasi_rak: { [Op.like]: '%' + rak + '%' },
							},
						},
					],
				},
			],
			offset: offset,
			limit: limitPage,
			order: [['isPinjam', 'DESC']],
		});
		res.status(200).json({
			hasilBuku: hasil,
			halamanKe: pageAt,
			jumlahBaris: jumlahBaris,
			jumlahHalaman: jumlahHalaman,
		});
	} catch (error) {
		console.log(error);
	}
};

// Pinjam buku
exports.pinjamBuku = async (req, res) => {
	try {
		const isAlreadyPinjam = await tbl_peminjaman.findAll({
			where: {
				buku_id: req.params.id,
				anggota_id: req.userId,
				isPinjam: true,
			},
		});

		if (isAlreadyPinjam.length > 0) return res.status(401).json('Buku sudah dipinjam!');

		const theBook = await tbl_buku.findOne({
			where: {
				id: req.params.id,
			},
		});
		if (!theBook) return res.status(400).json('Buku tidak ada!');
		if (theBook.stok == 0) return res.status(404).json('Stok tidak ada!');

		await tbl_buku.update(
			{ stok: theBook.stok - 1 },
			{
				where: {
					id: req.params.id,
				},
			}
		);

		const pinjam = await tbl_peminjaman.create({
			anggota_id: req.userId,
			buku_id: req.params.id,
			isPinjam: 1,
			tanggalPinjam: today,
		});

		const kembali = await tbl_pengembalian.create({
			anggota_id: req.userId,
			buku_id: req.params.id,
			isKembali: 0,
		});

		res.status(200).json({
			message: 'Berhasil Pinjam',
			statusPinjam: pinjam,
			statusKembali: kembali,
		});
	} catch (error) {
		console.log(error);
	}
};

// List pengembalian buku
exports.listBukuKembali = async (req, res) => {
	const pageAt = parseInt(req.query.page) || 0;
	const limitPage = parseInt(req.query.limit) || 10;
	const searchQuery = req.query.search_query || '';
	const kategori = req.query.kategori || '';
	const rak = req.query.rak || '';
	const isKembali = stringToBoolean(req.query.isKembali) || '';
	const offset = limitPage * pageAt;

	try {
		const jumlahBaris = await tbl_pengembalian.count({
			where: {
				anggota_id: req.userId,
				isKembali: isKembali,
			},
			required: true,
			include: [
				{
					model: tbl_buku,
					attributes: ['judul_buku'],
					where: {
						judul_buku: {
							[Op.like]: '%' + searchQuery + '%',
						},
					},
					include: [
						{
							model: tbl_kategori,
							as: 'Kategori_id',
							attributes: ['kategori_nama'],
							where: {
								kategori_nama: {
									[Op.like]: '%' + kategori + '%',
								},
							},
						},
						{
							model: tbl_rak,
							as: 'Rak_id',
							attributes: ['lokasi_rak'],
							where: {
								lokasi_rak: { [Op.like]: '%' + rak + '%' },
							},
						},
					],
				},
			],
		});

		const jumlahHalaman = Math.ceil(jumlahBaris / limitPage);
		const hasil = await tbl_pengembalian.findAll({
			where: {
				anggota_id: req.userId,
				isKembali: isKembali,
			},
			required: true,
			include: [
				{
					model: tbl_buku,
					attributes: ['judul_buku'],
					where: {
						judul_buku: {
							[Op.like]: '%' + searchQuery + '%',
						},
					},
					include: [
						{
							model: tbl_kategori,
							as: 'Kategori_id',
							attributes: ['kategori_nama'],
							where: {
								kategori_nama: {
									[Op.like]: '%' + kategori + '%',
								},
							},
						},
						{
							model: tbl_rak,
							as: 'Rak_id',
							attributes: ['lokasi_rak'],
							where: {
								lokasi_rak: { [Op.like]: '%' + rak + '%' },
							},
						},
					],
				},
			],
			offset: offset,
			limit: limitPage,
			order: [['isKembali', 'ASC']],
		});

		res.status(200).json({
			hasilBuku: hasil,
			halamanKe: pageAt,
			jumlahBaris: jumlahBaris,
			jumlahHalaman: jumlahHalaman,
		});
	} catch (error) {
		console.log(error);
	}
};

// Kembalikan buku
exports.kembalikanBuku = async (req, res) => {
	try {
		const peminjam = await tbl_peminjaman.findAll({
			where: {
				anggota_id: req.userId,
				buku_id: req.params.id,
				isPinjam: true,
			},
		});

		if (peminjam.length == 0) return res.status(404).json('Tidak ada yang meminjam!');
		if (peminjam[0].anggota_id !== req.userId) return res.status(401).json('Tidak diizinkan!');

		const theBook = await tbl_buku.findOne({
			where: {
				id: req.params.id,
			},
		});

		if (!theBook) return res.status(400).json('Buku tidak ada!');

		await tbl_buku.update(
			{
				stok: theBook.stok + 1,
			},
			{
				where: {
					id: theBook.id,
				},
			}
		);

		const startDate = new Date(peminjam[0].tanggalPinjam);
		const endDate = new Date(today);
		const lamaPinjam = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

		await tbl_pengembalian.update(
			{
				isKembali: true,
				tanggalPengembalian: today,
				durasiPinjam: lamaPinjam,
			},
			{
				where: {
					anggota_id: req.userId,
					buku_id: theBook.id,
					isKembali: false,
				},
			}
		);

		await tbl_peminjaman.update(
			{
				isPinjam: false,
			},
			{
				where: {
					anggota_id: req.userId,
					buku_id: theBook.id,
					isPinjam: true,
				},
			}
		);

		res.status(200).json({
			message: 'Berhasil Dikembalikan',
			lamaPinjam: lamaPinjam + ' hari',
		});
	} catch (error) {
		console.log(error.message);
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
