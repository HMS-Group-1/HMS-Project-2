const models = require('../models');
const tbl_buku = models.tbl_buku;

// untuk ambil data buku
exports.getBooks = async (req, res) => {
	try {
		const books = await tbl_buku.findAll();
		res.json(books);
	} catch (error) {
		console.log(error);
	}
};

// untuk create data buku
exports.createBooks = async (req, res) => {
	try {
		await tbl_buku.create(req.body, {
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ message: 'Book created' });
	} catch (error) {}
};
