'use strict';
module.exports = (sequelize, DataTypes) => {
	const tbl_anggota = sequelize.define(
		'tbl_anggota',
		{
			nama: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			no_telp: DataTypes.INTEGER,
			role: DataTypes.ENUM('admin', 'anggota'),
			refresh_token: DataTypes.TEXT,
		},
		{}
	);
	tbl_anggota.associate = function (models) {
		tbl_anggota.hasMany(models.tbl_peminjaman, {
			as: 'tbl_peminjaman',
		});
		tbl_anggota.hasMany(models.tbl_pengembalian, {
			as: 'tbl_pengembalian',
		});
	};
	return tbl_anggota;
};
