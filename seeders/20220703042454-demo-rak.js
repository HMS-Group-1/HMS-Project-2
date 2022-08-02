'use strict';

const { faker } = require('@faker-js/faker');

const rakGenerator = () => {
	let array = [];
	let id = 1;
	for (let i = 0; i < 15; i++) {
		let bannedChars = [];
		let namaRak = faker.random.alpha({ bannedChars: bannedChars }).toUpperCase();
		bannedChars.push(namaRak);
		let obj = {
			id: id,
			nama_rak: namaRak,
			lokasi_rak: `Ruang ${namaRak}`,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		id++;
		array.push(obj);
	}

	return array;
};

console.log(rakGenerator());

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_raks');
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_raks', null, {});
	},
};

// nama_rak: DataTypes.STRING,
// lokasi_rak: DataTypes.STRING,
