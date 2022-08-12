'use strict';

const rakGenerator = (nama_rak, lokasi_rak) => {
	let obj = {
		nama_rak: nama_rak,
		lokasi_rak: lokasi_rak,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	return obj;
};

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_raks', [
			rakGenerator('A', 'Ruang A'),
			rakGenerator('B', 'Ruang B'),
			rakGenerator('C', 'Ruang C'),
			rakGenerator('D', 'Ruang D'),
			rakGenerator('E', 'Ruang E'),
			rakGenerator('F', 'Ruang F'),
			rakGenerator('G', 'Ruang G'),
			rakGenerator('H', 'Ruang H'),
			rakGenerator('I', 'Ruang I'),
			rakGenerator('J', 'Ruang J'),
			rakGenerator('K', 'Ruang K'),
			rakGenerator('L', 'Ruang L'),
			rakGenerator('M', 'Ruang M'),
			rakGenerator('N', 'Ruang N'),
			rakGenerator('O', 'Ruang O'),
			rakGenerator('P', 'Ruang P'),
			rakGenerator('Q', 'Ruang Q'),
			rakGenerator('R', 'Ruang R'),
			rakGenerator('S', 'Ruang S'),
			rakGenerator('T', 'Ruang T'),
			rakGenerator('U', 'Ruang U'),
			rakGenerator('V', 'Ruang V'),
			rakGenerator('W', 'Ruang W'),
			rakGenerator('X', 'Ruang X'),
			rakGenerator('Y', 'Ruang Y'),
			rakGenerator('Z', 'Ruang Z'),
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_raks', null, {});
	},
};
