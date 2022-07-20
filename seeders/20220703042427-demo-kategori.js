'use strict';

const categoryGenerator = (kategori_nama) => {
	let obj = {
		kategori_nama: kategori_nama,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	return obj;
};

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_kategoris', [categoryGenerator('finance'), categoryGenerator('engineering'), categoryGenerator('politics')]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_kategoris', null, {});
	},
};
