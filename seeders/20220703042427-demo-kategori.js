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
		return queryInterface.bulkInsert('tbl_kategoris', [
			categoryGenerator('finance'),
			categoryGenerator('engineering'),
			categoryGenerator('politics'),
			categoryGenerator('science'),
			categoryGenerator('physics'),
			categoryGenerator('games'),
			categoryGenerator('psychology'),
			categoryGenerator('data'),
			categoryGenerator('animals'),
			categoryGenerator('industry'),
			categoryGenerator('history'),
			categoryGenerator('oceanology'),
			categoryGenerator('geography'),
			categoryGenerator('construction'),
			categoryGenerator('sci-fi'),
			categoryGenerator('cartoon'),
			categoryGenerator('religion'),
			categoryGenerator('movies'),
			categoryGenerator('review'),
			categoryGenerator('analysis'),
			categoryGenerator('opinion'),
			categoryGenerator('stock market'),
			categoryGenerator('foreign exchange'),
			categoryGenerator('culture'),
			categoryGenerator('gadgets'),
			categoryGenerator('peripherals'),
			categoryGenerator('biology'),
			categoryGenerator('chemistry'),
			categoryGenerator('marriage'),
			categoryGenerator('parenting'),
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_kategoris', null, {});
	},
};
