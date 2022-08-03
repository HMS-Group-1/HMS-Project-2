'use strict';
const fs = require('fs');
const { faker } = require('@faker-js/faker');

const randomNumbers = (max) => {
	return Math.floor(Math.random() * max);
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

const deskripsi = () => {
	let paragraf = '';
	for (let i = 0; i <= 50; i++) {
		const result = faker.lorem.sentences(6);
		paragraf += result;
	}
	return paragraf;
};

const bookGenerator = (judul_buku, path) => {
	let obj = {
		judul_buku: judul_buku,
		kategori_id: faker.datatype.number({ min: 1, max: 100 }),
		deskripsi: deskripsi(),
		gambar: fs.readFileSync(`./public/images/${path}.jpg`),
		stok: faker.datatype.number({ max: 200 }),
		rak_id: faker.datatype.number({ min: 1, max: 26 }),
		tahun_terbit: tahunTerbit(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	return obj;
};

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_bukus', [
			bookGenerator('History of Worldwide Pandemic', 'contoh-cover-buku-ajar'),
			bookGenerator('Paths to become entrepreneurs', 'Paths-to-become-entrepreneurs'),
			bookGenerator('Kebudayaan Indonesia Dimata Orang Korea', 'Kebudayaan-Indonesia-Dimata-Orang-Korea'),
			bookGenerator('Change Your Destiny', 'Change-your-destiny'),
			bookGenerator('Muda Berdaya Karya Raya', 'Muda-Berdaya-Karya-Raya'),
			bookGenerator('Lancar Berbicara: Kapan, Dimana, dan Dengan Siapa Saja', 'Lancar-Bicara'),
			bookGenerator('Beach Money', 'Beach-Money'),
			bookGenerator('Great Influencer', 'Great-Influencer'),
			bookGenerator('Trik Seni Berbicara Dan Seni Mendengar Untuk Komunikasi Efektif Dan Memikat', 'Trik-Seni-Berbicara'),
			bookGenerator('You Are a Badass: Stop Meragukan Kehebatanmu (Edisi Revisi)', 'You-are-a-badass'),
			bookGenerator('Finding Sisu: Hidup Sehat Dan Seimbang Ala Orang Finlandia', 'Finding-Sisu'),
			bookGenerator('The Art of Listening', 'The-art-of-listening'),
			bookGenerator('Life By Design', 'Life-by-design'),
			bookGenerator('Berani Bicara Di Depan Publik: Langkah-Langkah Menguasai Audiens', 'Berani-Bicara-Di-Depan-Publik'),
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_bukus', null, {});
	},
};
