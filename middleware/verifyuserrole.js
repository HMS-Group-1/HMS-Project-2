const models = require('../models');
const tbl_anggota = models.tbl_anggota;

// Admin verification

exports.verifyAdmin = async (req, res, next) => {
	try {
		if (!req.role) return res.sendStatus(401);
		if (req.role !== 'admin') return res.sendStatus(401);
		next();
	} catch (error) {
		console.log(error.message);
	}
};

exports.verifyUser = async (req, res, next) => {
	try {
		if (!req.role) return res.sendStatus(401);
		if (req.role !== 'anggota') return res.sendStatus(401);
		next();
	} catch (error) {
		console.log(error.message);
	}
};
