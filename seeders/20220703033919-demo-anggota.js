'use strict';

const bcrypt = require('bcrypt');

const randomNumbers = (max) => {
	return Math.floor(Math.random() * max);
};

const randomNumbersMinMax = (min = 8, max = 15) => {
	const difference = max - min;
	let result = randomNumbers(difference);
	result = result + min;
	return result;
};

const randomNames = (length) => {
	let result = '';
	const characters = 'abcdefghijklmnopqrstuvwxyz';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(randomNumbers(charactersLength));
	}
	return result;
};

const randomRoles = () => {
	const roles = ['admin', 'anggota'];
	const randomRoles = roles[randomNumbers(roles.length)];
	return randomRoles;
};

const passwordGenerator = (password) => {
	return bcrypt.hashSync(password, 10);
};

const anggotaGenerator = (email, password) => {
	let obj = {
		nama: randomNames(randomNumbersMinMax()),
		email: email,
		password: passwordGenerator(password),
		no_telp: randomNumbers(1000000000),
		role: randomRoles(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	return obj;
};

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_anggota', [
			anggotaGenerator('a@a.com', 'a'.repeat(4)),
			anggotaGenerator('b@b.com', 'b'.repeat(4)),
			anggotaGenerator('c@c.com', 'c'.repeat(4)),
			anggotaGenerator('d@d.com', 'd'.repeat(4)),
			anggotaGenerator('e@e.com', 'e'.repeat(4)),
			anggotaGenerator('f@f.com', 'f'.repeat(4)),
			anggotaGenerator('g@g.com', 'g'.repeat(4)),
			anggotaGenerator('h@h.com', 'h'.repeat(4)),
			anggotaGenerator('i@i.com', 'i'.repeat(4)),
			anggotaGenerator('j@j.com', 'j'.repeat(4)),
			anggotaGenerator('k@k.com', 'k'.repeat(4)),
			anggotaGenerator('l@l.com', 'l'.repeat(4)),
			anggotaGenerator('m@m.com', 'm'.repeat(4)),
			anggotaGenerator('n@n.com', 'n'.repeat(4)),
			anggotaGenerator('o@o.com', 'o'.repeat(4)),
			anggotaGenerator('p@p.com', 'p'.repeat(4)),
			anggotaGenerator('q@q.com', 'q'.repeat(4)),
			anggotaGenerator('r@r.com', 'r'.repeat(4)),
			anggotaGenerator('s@s.com', 's'.repeat(4)),
			anggotaGenerator('t@t.com', 't'.repeat(4)),
			anggotaGenerator('u@u.com', 'u'.repeat(4)),
			anggotaGenerator('v@v.com', 'v'.repeat(4)),
			anggotaGenerator('w@w.com', 'w'.repeat(4)),
			anggotaGenerator('x@x.com', 'x'.repeat(4)),
			anggotaGenerator('y@y.com', 'y'.repeat(4)),
			anggotaGenerator('z@z.com', 'z'.repeat(4)),
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_anggota', null, {});
	},
};
