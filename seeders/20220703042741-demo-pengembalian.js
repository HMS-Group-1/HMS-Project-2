'use strict';

const pengembalianGenerator = () => {
	let array = [];
	let strictOrder = [];
	let increment = 1;
	let id = 1;
	let incrementZero = 0;
	for (let i = 0; i < 14; i++) {
		strictOrder.push(increment);
		increment++;
	}
	for (let i = 0; i < 14; i++) {
		let obj = {
			id: id,
			anggota_id: strictOrder[incrementZero],
			buku_id: id,
			isKembali: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		id++;
		incrementZero++;
		array.push(obj);
	}
	return array;
};

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_pengembalians', pengembalianGenerator());
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_pengembalians', null, {});
	},
};
