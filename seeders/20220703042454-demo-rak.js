'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_raks', [
			{
				nama_rak: 'A',
				lokasi_rak: 'Ruang A',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				nama_rak: 'B',
				lokasi_rak: 'Ruang B',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				nama_rak: 'C',
				lokasi_rak: 'Ruang C',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_raks', null, {});
	},
};

// nama_rak: DataTypes.STRING,
// lokasi_rak: DataTypes.STRING,
