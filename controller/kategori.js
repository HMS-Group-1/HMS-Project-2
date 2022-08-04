const models = require('../models');
const tbl_kategori = models.tbl_kategori;

exports.getAllKategori = async (req, res) => {
	try {
		const response = await tbl_kategori.findAll({
			order: [['kategori_nama', 'ASC']],
		});
		res.status(200).json(response);
	} catch (err) {
		console.log(error);
		res.status(500).send({
			msg: err.message,
		});
	}
};

exports.postKategori = async (req, res) => {
	try {
		await tbl_kategori.create(req.body);
		res.status(200).send({ msg: 'post berhasil' });
	} catch (error) {
		res.status(500).send({ msg: error.message });
	}
};
