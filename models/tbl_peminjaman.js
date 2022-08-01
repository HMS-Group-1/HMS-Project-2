'use strict';
module.exports = (sequelize, DataTypes) => {
	const tbl_peminjaman = sequelize.define(
		'tbl_peminjaman',
		{
			tgl_peminjaman: DataTypes.DATE,
			staff_id: DataTypes.INTEGER,
			member_id: DataTypes.INTEGER,
			buku_id: DataTypes.INTEGER,
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
		});
	};
	return tbl_peminjaman;
};
