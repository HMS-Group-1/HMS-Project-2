'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	const tbl_pengembalian = sequelize.define(
		'tbl_pengembalian',
		{
			tgl_pengembalian: DataTypes.DATE,
			staff_id: DataTypes.INTEGER,
			member_id: DataTypes.INTEGER,
			buku_id: DataTypes.INTEGER,
		},
		{}
	);
	tbl_pengembalian.associate = function (models) {
		tbl_pengembalian.belongsTo(models.tbl_buku, {
			foreignKey: 'buku_id',
			as: 'Buku_id',
		});
		tbl_pengembalian.belongsTo(models.tbl_anggota, {
			foreignKey: 'member_id',
			as: 'Member_id',
		});
	};
	return tbl_pengembalian;
};
