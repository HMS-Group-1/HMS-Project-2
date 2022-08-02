'use strict';

const { faker } = require('@faker-js/faker');

const categoryGenerator = () => {
	let array = [];
	let id = 0;
	for (let i = 0; i < 100; i++) {
		let obj = {
			id: id + 1,
			kategori_nama: faker.random.word(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		id++;
		array.push(obj);
	}
	return array;
};

console.log(categoryGenerator());

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_kategoris', categoryGenerator());
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_kategoris', null, {});
	},
};
