'use strict';

const randomNumbers = Math.floor(Math.random() * 1000000000);

const randomNames = (length) => {
	let result = '';
	const characters = 'abcdefghijklmnopqrstuvwxyz';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

const randomRoles = () => {
	const roles = ['admin', 'anggota'];
	const randomRoles = roles[Math.floor(Math.random() * roles.length)];
	return randomRoles;
};

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_anggota', [
			{
				nama: randomNames(10),
				email: 'john@john.com',
				password: passwordHasher('johnny'),
				no_telp: randomNumbers,
				role: 'admin',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				nama: randomNames(10),
				email: 'Deee@a.com',
				password: 'Deltaa',
				no_telp: randomNumbers,
				role: randomRoles(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				nama: randomNames(10),
				email: 'Tony@star.com',
				password: 'touuny',
				no_telp: randomNumbers,
				role: randomRoles(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_anggota', null, {});
	},
};
