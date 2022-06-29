'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('tbl_bukus', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			judul_buku: {
				type: Sequelize.STRING,
			},
			kategori_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'tbl_kategoris',
					key: 'id',
				},
			},
			deskripsi: {
				type: Sequelize.STRING,
			},
			gambar: {
				type: Sequelize.BLOB,
			},
			stok: {
				type: Sequelize.INTEGER,
			},
			rak_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'tbl_raks',
					key: 'id',
				},
			},
			stok: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('tbl_bukus');
	},
};
