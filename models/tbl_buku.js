'use strict';

module.exports = (sequelize, DataTypes) => {
	const tbl_buku = sequelize.define(
		'tbl_buku',
		{
			judul_buku: DataTypes.STRING,
			kategori_id: DataTypes.INTEGER,
			deskripsi: DataTypes.STRING,
			gambar: DataTypes.BLOB,
			stok: DataTypes.INTEGER,
			rak_id: DataTypes.INTEGER,
			stok: DataTypes.INTEGER,
		},
		{}
	);
	tbl_buku.associate = function (models) {
		tbl_buku.belongsTo(models.tbl_kategori, { foreignKey: 'kategori_id', as: 'Kategori_id' });
		tbl_buku.belongsTo(models.tbl_rak, { foreignKey: 'rak_id', as: 'Rak_id' });
		tbl_buku.hasMany(models.tbl_peminjaman, {
			as: 'tbl_peminjaman',
		});
		tbl_buku.hasMany(models.tbl_pengembalian, {
			as: 'tbl_pengembalian',
		});
	};
	return tbl_buku;
};
