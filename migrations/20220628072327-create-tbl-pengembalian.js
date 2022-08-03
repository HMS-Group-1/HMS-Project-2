'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('tbl_pengembalians', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			anggota_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'tbl_anggota',
					key: 'id',
				},
			},
			buku_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'tbl_bukus',
					key: 'id',
				},
			},
			isKembali: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: 0,
			},
			tanggalPengembalian: {
				type: Sequelize.DATEONLY,
			},
			durasiPinjam: {
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
		await queryInterface.dropTable('tbl_pengembalians');
	},
};
