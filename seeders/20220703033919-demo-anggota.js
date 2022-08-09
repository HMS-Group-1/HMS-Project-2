'use strict';

const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

const passwordGenerator = (password) => {
	return bcrypt.hashSync(password, 10);
};

const anggotaGenerator = () => {
	let array = [];
	let id = 1;
	for (let i = 0; i < 100; i++) {
		let obj = {
			id: id,
			nama: faker.name.findName(),
			email: faker.internet.email(),
			password: passwordGenerator('a'.repeat(4)),
			no_telp: faker.phone.number('##########'),
			role: faker.helpers.arrayElement(['admin', 'anggota']),
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		id++;
		array.push(obj);
	}
	return array;
};

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_anggota', anggotaGenerator());
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_anggota', null, {});
	},
};
