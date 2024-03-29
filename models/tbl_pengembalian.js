'use strict';
module.exports = (sequelize, DataTypes) => {
	const tbl_pengembalian = sequelize.define(
		'tbl_pengembalian',
		{
			anggota_id: DataTypes.INTEGER,
			buku_id: DataTypes.INTEGER,
			isKembali: DataTypes.BOOLEAN,
			tanggalPengembalian: DataTypes.DATEONLY,
			durasiPinjam: DataTypes.INTEGER,
		},
		{}
	);
	tbl_pengembalian.associate = function (models) {
		tbl_pengembalian.belongsTo(models.tbl_buku, {
			foreignKey: 'buku_id',
		});
		tbl_pengembalian.belongsTo(models.tbl_anggota, {
			foreignKey: 'anggota_id',
		});
	};
	return tbl_pengembalian;
};
