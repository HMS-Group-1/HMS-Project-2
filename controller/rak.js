const models = require('../models');
const tbl_rak = models.tbl_rak;

exports.getRaks = async (req, res) => {
	try {
		const response = await tbl_rak.findAll();
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
	}
};
