const models = require('../models');
const tbl_anggota = models.tbl_anggota;

// GET USERS
exports.getAllUsers = async (req, res) => {
	try {
		const response = await tbl_anggota.findAll();
		res.json(response);
	} catch (error) {
		console.log(error.message);
	}
};

// UPDATE USERS
exports.updateUsers = async (req, res) => {
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
