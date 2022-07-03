'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_anggota', [
			{
				name: 'John',
				email: 'john@john.com',
				password: 'johny',
				no_telp: '000111222',
			},
			{
				name: 'Dea',
				email: 'Deee@a.com',
				password: 'Deltaa',
				no_telp: '9183271290',
			},
			{
				name: 'Tony',
				email: 'Tony@star.com',
				password: 'touuny',
				no_telp: '91875313508',
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_anggota', null, {});
	},
};
