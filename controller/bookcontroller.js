const models = require('../models');
const tbl_buku = models.tbl_buku;

// untuk ambil data buku
exports.getBooks = async (req, res) => {
	try {
		const books = await tbl_buku.findAll();
		res.status(200).json(books);
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
	try {
		await tbl_buku.create(req.body);
		res.status(201).json({ message: 'Book created' });
	} catch (error) {
		console.log(error.message);
	}
};

// untuk update data buku

exports.updateBooks = async (req, res) => {
	try {
		await tbl_buku.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ message: 'Book Updated' });
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
