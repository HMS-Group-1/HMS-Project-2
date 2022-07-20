'use strict';
const fs = require('fs');
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_bukus', [
			{
				judul_buku: 'History of Worldwide Pandemic',
				kategori_id: 3,
				deskripsi: 'The things people have no idea about, and the things that force people to adapt strangely with situation',
				gambar: fs.readFileSync('./public/images/contoh-cover-buku-ajar.jpg'),
				stok: 10,
				rak_id: 1,
				tahun_terbit: 1920,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				judul_buku: 'Paths to become entrepreneurs',
				kategori_id: 1,
				deskripsi: 'People know less about money, yet they interact daily with it, think of it, and make fun of it',
				gambar: fs.readFileSync('./public/images/buku-2.jpg'),
				stok: 20,
				rak_id: 2,
				tahun_terbit: 1980,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				judul_buku: 'Bugs in Software Lifecycles',
				kategori_id: 2,
				deskripsi: 'Engineers worldwide endlessly fight to kill bugs yet they can not figure out the main issues',
				gambar: fs.readFileSync('./public/images/buku-3.jpg'),
				stok: 30,
				rak_id: 3,
				tahun_terbit: 2000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_bukus', null, {});
	},
};
