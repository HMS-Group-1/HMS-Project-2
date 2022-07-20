'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('tbl_peminjamans', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			tgl_peminjaman: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now'),
			},
			staff_id: {
				type: Sequelize.INTEGER,
			},
			member_id: {
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
		await queryInterface.dropTable('tbl_peminjamans');
	},
};
