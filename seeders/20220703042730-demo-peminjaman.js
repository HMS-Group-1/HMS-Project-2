'use strict';

const getRandomDate = () => {
	const year = 2022;
	const month = 7;
	const day = Math.floor(Math.random() * 30);
	return year + '-' + month + '-' + day;
};

const peminjamanGenerator = () => {
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
			isPinjam: true,
			tanggalPinjam: getRandomDate(),
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
		return queryInterface.bulkInsert('tbl_peminjamans', peminjamanGenerator());
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_peminjamans', null, {});
	},
};
