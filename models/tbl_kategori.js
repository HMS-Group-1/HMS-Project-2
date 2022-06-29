'use strict';
module.exports = (sequelize, DataTypes) => {
	const tbl_kategori = sequelize.define(
		'tbl_kategori',
		{
			kategori_nama: DataTypes.STRING,
		},
		{}
	);
	tbl_kategori.associate = function (models) {
		tbl_kategori.hasMany(models.tbl_buku, {
			as: 'tbl_kategori',
		});
	};

	return tbl_kategori;
};
