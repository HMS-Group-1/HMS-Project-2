'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_kategoris', [
			{
				kategori_nama: 'finance',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				kategori_nama: 'engineering',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				kategori_nama: 'politics',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_kategoris', null, {});
	},
};
