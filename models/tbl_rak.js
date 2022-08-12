'use strict';
module.exports = (sequelize, DataTypes) => {
	const tbl_rak = sequelize.define(
		'tbl_rak',
		{
			nama_rak: DataTypes.STRING,
			lokasi_rak: DataTypes.STRING,
		},
		{}
	);
	tbl_rak.associate = function (models) {
		tbl_rak.hasMany(models.tbl_buku, {
			foreignKey: 'rak_id',
		});
	};
	return tbl_rak;
};
