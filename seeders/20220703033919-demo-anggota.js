'use strict';

const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

const passwordGenerator = (password) => {
	return bcrypt.hashSync(password, 10);
};

const anggotaGenerator = (password) => {
	let obj = {
		nama: faker.name.findName(),
		email: faker.internet.email(),
		password: passwordGenerator(password),
		no_telp: faker.phone.number('#########'),
		role: faker.helpers.arrayElement(['admin', 'anggota']),
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	return obj;
};

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_anggota', [
			anggotaGenerator('a'.repeat(4)),
			anggotaGenerator('b'.repeat(4)),
			anggotaGenerator('c'.repeat(4)),
			anggotaGenerator('d'.repeat(4)),
			anggotaGenerator('e'.repeat(4)),
			anggotaGenerator('f'.repeat(4)),
			anggotaGenerator('g'.repeat(4)),
			anggotaGenerator('h'.repeat(4)),
			anggotaGenerator('i'.repeat(4)),
			anggotaGenerator('j'.repeat(4)),
			anggotaGenerator('k'.repeat(4)),
			anggotaGenerator('l'.repeat(4)),
			anggotaGenerator('m'.repeat(4)),
			anggotaGenerator('n'.repeat(4)),
			anggotaGenerator('o'.repeat(4)),
			anggotaGenerator('p'.repeat(4)),
			anggotaGenerator('q'.repeat(4)),
			anggotaGenerator('r'.repeat(4)),
			anggotaGenerator('s'.repeat(4)),
			anggotaGenerator('t'.repeat(4)),
			anggotaGenerator('u'.repeat(4)),
			anggotaGenerator('v'.repeat(4)),
			anggotaGenerator('w'.repeat(4)),
			anggotaGenerator('x'.repeat(4)),
			anggotaGenerator('y'.repeat(4)),
			anggotaGenerator('z'.repeat(4)),
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_anggota', null, {});
	},
};
