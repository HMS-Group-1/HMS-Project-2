'use strict';
const fs = require('fs');

const randomNumbers = (max) => {
	return Math.floor(Math.random() * max);
};

const randomNumbersMinMax = (min = 8, max = 15) => {
	const difference = max - min;
	let result = randomNumbers(difference);
	result = result + min;
	return result;
};

const tahunTerbit = () => {
	const tahun = [1];
	const digitKeDua = [6, 7, 8, 9];
	const digitKeTiga = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const digitKeEmpat = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	tahun.push(digitKeDua[randomNumbers(4)]);
	tahun.push(digitKeTiga[randomNumbers(9)]);
	tahun.push(digitKeEmpat[randomNumbers(9)]);
	return tahun.join('');
};

// perlu diubah sesuai dengan jumlah tbl_rak
const rak_idGenerator = () => {
	return randomNumbers(27);
};

const stockGenerator = () => {
	return randomNumbersMinMax(100, 1000);
};

// perlu diubah sesuai dengan jumlah tbl_kategori
const categoryGenerator = () => {
	return randomNumbersMinMax(1, 31);
};

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_bukus', [
			{
				judul_buku: 'History of Worldwide Pandemic',
				kategori_id: categoryGenerator(),
				deskripsi: 'The things people have no idea about, and the things that force people to adapt strangely with situation',
				gambar: fs.readFileSync('./public/images/contoh-cover-buku-ajar.jpg'),
				stok: stockGenerator(),
				rak_id: rak_idGenerator(),
				tahun_terbit: tahunTerbit(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				judul_buku: 'Paths to become entrepreneurs',
				kategori_id: categoryGenerator(),
				deskripsi: 'People know less about money, yet they interact daily with it, think of it, and make fun of it',
				gambar: fs.readFileSync('./public/images/buku-2.jpg'),
				stok: stockGenerator(),
				rak_id: rak_idGenerator(),
				tahun_terbit: tahunTerbit(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				judul_buku: 'Bugs in Software Lifecycles',
				kategori_id: categoryGenerator(),
				deskripsi: 'Engineers worldwide endlessly fight to kill bugs yet they can not figure out the main issues',
				gambar: fs.readFileSync('./public/images/buku-3.jpg'),
				stok: stockGenerator(),
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
