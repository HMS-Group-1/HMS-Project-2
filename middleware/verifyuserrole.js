const models = require('../models');
const tbl_anggota = models.tbl_anggota;

// Admin verification

exports.verifyRoles = async (req, res, next) => {
	try {
		console.log(req.role);
		if (!req.role) return res.sendStatus(401);
		if (req.role !== 'admin') return res.sendStatus(401);
		next();
	} catch (error) {
		console.log(error.message);
	}
};

// exports.verifyRoles = async () => {
// 	return (req, res, next) => {
// 		console.log(req.role);
// 		if (!req.role) return res.sendStatus(401);
// 		if (req.role == 'admin') return res.status(200);
// 		next();
// 	};
// };

// exports.AdminOrNot = async (req, res, next) => {
// 	try {
// 		const user = await tbl_anggota.findOne({
// 			where: {
// 				email: req.body.email,
// 			},
// 		});
// 		if (user == null) return res.status(404).send('User Not Found');
// 		if (user[0].role !== 'admin') return res.status(401).send('Not Allowed');
// 		next();
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// };
