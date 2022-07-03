'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_anggota', [
			{
				nama: 'John',
				email: 'john@john.com',
				password: 'johny',
				no_telp: '000111222',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				nama: 'Dea',
				email: 'Deee@a.com',
				password: 'Deltaa',
				no_telp: '918327129',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				nama: 'Tony',
				email: 'Tony@star.com',
				password: 'touuny',
				no_telp: '918753135',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_anggota', null, {});
	},
};
