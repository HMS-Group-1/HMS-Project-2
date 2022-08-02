'use strict';
module.exports = (sequelize, DataTypes) => {
	const tbl_peminjaman = sequelize.define(
		'tbl_peminjaman',
		{
			anggota_id: DataTypes.INTEGER,
			buku_id: DataTypes.INTEGER,
			isPinjam: DataTypes.BOOLEAN,
		},
		{}
	);
	tbl_peminjaman.associate = function (models) {
		tbl_peminjaman.belongsTo(models.tbl_buku, {
			foreignKey: 'buku_id',
			as: 'Buku_id',
		});
		tbl_peminjaman.belongsTo(models.tbl_anggota, {
			foreignKey: 'anggota_id',
			as: 'Anggota_id',
		});
	};
	return tbl_peminjaman;
};
