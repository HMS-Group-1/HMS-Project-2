const models = require('../models');
const tbl_anggota = models.tbl_anggota;

exports.getAllUsers = async (req, res) => {
	try {
		const response = await tbl_anggota.findAll();
		res.json(response);
	} catch (error) {
		console.log(error.message);
	}
};
