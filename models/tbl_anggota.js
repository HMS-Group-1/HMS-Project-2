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
	tbl_anggota.associate = function (models) {};
	return tbl_anggota;
};
