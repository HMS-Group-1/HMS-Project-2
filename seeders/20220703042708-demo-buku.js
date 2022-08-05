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
			bookGenerator('Melangkah', 'melangkah'),
			bookGenerator('Life By Design', 'Life-by-design'),
			bookGenerator('Laut Bercerita', 'Laut-Bercerita'),
			bookGenerator('Home Sweet Loan', 'Home_Sweet_Loan_cov'),
			bookGenerator('Rich Dad - Increase Your Financial IQ', 'RICH-DADS'),
			bookGenerator('Lepas Landas', 'Lepas-landas'),
			bookGenerator('How To Think Like Sherlock Holmes', 'How To Think Like Sherlock Holmes'),
			bookGenerator('Battle Story : Somme 1916', 'Battle Story Somme 1916'),
			bookGenerator('Yuval Noah H: Sapiens (Sc)', 'Sapiens (Sc)'),
			bookGenerator('James M Russell: Brief Guide To Business Classics (SC)', 'Brief Guide To Business Classics (SC)'),
			bookGenerator('Tara Westover: Educated A Memoir', 'Educated A Memoir'),
			bookGenerator('Atomic Habits: Perubahan Kecil yang Memberikan Hasil Luar Biasa', 'Atomic Habits'),
			bookGenerator('Pulang-Pergi', 'pulang-pergi_tere_liye'),
			bookGenerator('Buku Anak Harry Potter dan Piala Api (Harry Potter and The Goblet of Fire)', 'Buku Anak Harry Potter dan Piala Api (Harry Potter and The Goblet of Fire)'),
			bookGenerator('Penelusuran Benang Merah (A Study In Scarlet)', 'Penelusuran Benang Merah'),
			bookGenerator('Ergonomi Industri', 'Ergonomi Industri'),
			bookGenerator('Why? The Wealth of Nations (Adam Smith)', 'The Wealth of Nations'),
			bookGenerator('Pria Bernama Ove (A Man Called Ove)', 'Pria Bernama Ove'),
			bookGenerator('Tanpa Dirimu Aku Bahagia', 'Tanpa Dirimu Aku Bahagia'),
			bookGenerator('LC: Attack on Titan 32', 'Attack on Titan 32'),
			bookGenerator('You Do You: Discovering Life through Experiments & Self-Awareness', 'Discovering Life through'),
			bookGenerator('Indonesia Mental Health First Aid Booklet Panduan Pertolongan Pertama Kesehatan', 'Mental Health First'),
			bookGenerator('Bung Karno Penyambung Lidah Rakyat Indonesia Edisi Revisi 2', 'Bung Karno Penyambung Lidah Rakyat Indonesia'),
			bookGenerator('The Star and I', 'The Star and I'),
			bookGenerator('Memilih (Menjadi Investor) Bahagia', 'Memilih (Menjadi Investor) Bahagia'),
			bookGenerator('The Intelligent Investor (Edisi Revisi)', 'The Intelligent Investor (Edisi Revisi)'),
			bookGenerator('Kompetensi SDM di Era 4.0', 'Kompetensi SDM di Era 4.0'),
			bookGenerator('Analisis Dampak Kebijakan Menggunakan Model Computable General', 'Analisis Dampak Kebijakan Menggunakan Model Computable General'),
			bookGenerator('Technical Analysis For Mega Profit', 'Technical Analysis For Mega Profit'),
			bookGenerator('BTS X EXO (Exclusive Book)', 'BTS X EXO (Exclusive Book)'),
			bookGenerator('Strategi Bisnis Bank Syariah', 'Strategi Bisnis Bank Syariah'),
			bookGenerator('Jurnal Harga Satuan Bahan Bangunan Konstruksi Dan Interior Edisi 38 2019', 'Jurnal Harga Satuan Bahan Bangunan'),
			bookGenerator('Arsitektur Kota', 'Arsitektur Kota'),
			bookGenerator('Bts, To All The Youngsters Without Dreams', 'Bts, To All The Youngsters Without Dreams'),
			bookGenerator('Income Pentagon', 'Income Pentagon'),
			bookGenerator('Hbr Guide To Delivering Effective Feedback', 'melangkah'),
			bookGenerator('The History Of Java', 'The History Of Java'),
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_bukus', null, {});
	},
};
