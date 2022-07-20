'use strict';
const fs = require('fs');

const stokGenerator = () => {
	return Math.floor(Math.random() * 1000);
};

const tahunTerbit = () => {
	const tahun = [1];
	const digitKeDua = [6, 7, 8, 9];
	const digitKeTiga = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const digitKeEmpat = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	tahun.push(digitKeDua[Math.floor(Math.random() * 4)]);
	tahun.push(digitKeTiga[Math.floor(Math.random() * 9)]);
	tahun.push(digitKeEmpat[Math.floor(Math.random() * 9)]);
	return tahun.join('');
};

const rak_idGenerator = () => {
	return Math.floor(Math.random() * 27);
};

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_bukus', [
			{
				judul_buku: 'History of Worldwide Pandemic',
				kategori_id: 3,
				deskripsi: 'The things people have no idea about, and the things that force people to adapt strangely with situation',
				gambar: fs.readFileSync('./public/images/contoh-cover-buku-ajar.jpg'),
				stok: stokGenerator(),
				rak_id: rak_idGenerator(),
				tahun_terbit: tahunTerbit(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				judul_buku: 'Paths to become entrepreneurs',
				kategori_id: 1,
				deskripsi: 'People know less about money, yet they interact daily with it, think of it, and make fun of it',
				gambar: fs.readFileSync('./public/images/buku-2.jpg'),
				stok: stokGenerator(),
				rak_id: rak_idGenerator(),
				tahun_terbit: tahunTerbit(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				judul_buku: 'Bugs in Software Lifecycles',
				kategori_id: 2,
				deskripsi: 'Engineers worldwide endlessly fight to kill bugs yet they can not figure out the main issues',
				gambar: fs.readFileSync('./public/images/buku-3.jpg'),
				stok: stokGenerator(),
				rak_id: rak_idGenerator(),
				tahun_terbit: tahunTerbit(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_bukus', null, {});
	},
};
