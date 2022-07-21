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
	return randomNumbersMinMax(1, 27);
};

const stockGenerator = () => {
	return randomNumbersMinMax(100, 1000);
};

// perlu diubah sesuai dengan jumlah tbl_kategori
const categoryGenerator = () => {
	return randomNumbersMinMax(1, 31);
};

const bookGenerator = (judul_buku, deskripsi, path) => {
	let obj = {
		judul_buku: judul_buku,
		kategori_id: categoryGenerator(),
		deskripsi: deskripsi,
		gambar: fs.readFileSync(path),
		stok: stockGenerator(),
		rak_id: rak_idGenerator(),
		tahun_terbit: tahunTerbit(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	return obj;
};

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('tbl_bukus', [
			bookGenerator('History of Worldwide Pandemic', 'The things people have no idea about, and the things that force people to adapt strangely witht the situation', './public/images/contoh-cover-buku-ajar.jpg'),
			bookGenerator('Paths to become entrepreneurs', 'People know less about money, yet they interact daily with it, think of it, and make fun of it', './public/images/buku-2.jpg'),
			bookGenerator('Bugs in Software Lifecycles', 'Engineers worldwide endlessly fight to kill bugs yet they can not figure out the main issues', './public/images/buku-3.jpg'),
			bookGenerator(
				'Kebudayaan Indonesia Dimata Orang Korea',
				`Buku Kebudayaan Indonesia di Mata Orang Korea ini berkisah tentang kehidupan sehari-hari masyarakat di Indonesia yang dilihat dan direfleksikan melalui kacamata orang Korea. Esai-esai yang ditulis di dalamnya mencakup rentang topik yang begitu kaya, mulai dari makanan sehari-hari, agama yang dianut, pendidikan, kehidupan sosial, dan sebagainya yang mencerminkan budaya Indonesia. Sang penulis, Prof. Yang Seung Yoon, mengisahkan setiap cerita dengan cara yang sederhana dan lugas, namun memiliki makna yang luas dan mendalam. Buku ini sendiri ditulis berdasarkan basis pengalaman konkret, sehingga apa yang disampaikannya bersifat kontekstual dan faktual. Kehadiran nyata Prof. Yang dalam kehidupan sehari-hari masyarakat Indonesia dan interaksi dengan mereka menjadi landasan refleksi eksistensialis yang tidak dapat dipungkiri. 
				Semoga dengan kehadiran buku ini ke tengah khazcinah literasi Indonesia, dapat terjalinlah suatu hubungan mesra di dalam kemitraan Indonesia dengan Korea. Selain itu, harapannya, banyak orang dari luar Indonesia yang semakin tertarik pula untuk belajar dan mengerti tentang budaya Indonesia yang begitu kaya dengan ragam makna.
							`,
				'./public/images/Kebudayaan-Indonesia-Dimata-Orang-Korea'
			),
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_bukus', null, {});
	},
};
