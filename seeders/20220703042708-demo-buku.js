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
	return randomNumbersMinMax(1, 30);
};

const bookGenerator = (judul_buku, path) => {
	let obj = {
		judul_buku: judul_buku,
		kategori_id: categoryGenerator(),
		deskripsi:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus maxime quaerat repellat expedita. Sapiente, tenetur cupiditate, dolor autem fugiat porro debitis possimus sint veritatis asperiores vitae, amet numquam illum modi necessitatibus repudiandae! Animi ea beatae consequuntur nisi perferendis deserunt necessitatibus! Quaerat, earum neque. Rerum reiciendis magnam possimus beatae labore autem in ipsum facilis nesciunt doloribus laudantium sequi aliquam saepe incidunt natus ad deleniti illo voluptates molestiae, velit esse consequuntur quia expedita inventore. Asperiores ex odio nostrum veritatis nam cumque enim tenetur sed est natus repellendus, labore rem! Ipsum minima provident culpa dolor autem atque cumque pariatur fuga laudantium adipisci aperiam hic, illo repellat voluptas harum, quae tempora tenetur velit! Saepe ea est laboriosam neque, velit molestias voluptatibus. Pariatur voluptate sapiente cupiditate molestiae ea. Eveniet ad optio voluptates omnis qui maxime. Ex facilis repellat ipsa velit, autem quas. Corporis porro reiciendis sint hic aliquid quia dignissimos dolorem in harum quaerat temporibus corrupti assumenda nam culpa ducimus labore inventore, fuga unde eveniet quas itaque, est, nostrum atque. Tempora, quia! Culpa labore sequi aliquam autem rerum expedita atque? Laborum vero eveniet optio mollitia rerum esse placeat, quo fugit corrupti quasi voluptate accusamus dolorum adipisci. Provident id accusantium quam suscipit, perspiciatis reprehenderit a consequuntur beatae non iure. Aspernatur, expedita. Dolore beatae et harum omnis a odio voluptatibus mollitia. Deserunt, ducimus! Aliquid ipsa facere modi repudiandae deserunt placeat quasi id nisi laudantium dolorem dignissimos sapiente delectus minus culpa, voluptatum quis, quam aut at, sed sequi est. Hic excepturi tenetur illo similique quo explicabo, maxime dolores rem quae laboriosam error tempore doloribus repudiandae vitae aperiam eum, est sequi sunt iure. Beatae, officiis voluptas! Ex nisi architecto quaerat assumenda pariatur consequatur nesciunt expedita dolores iste hic iure aut nulla at, eius perspiciatis! Animi repellendus eos recusandae, fugit, dignissimos culpa commodi vero maxime ex autem error, exercitationem accusamus quidem aspernatur pariatur esse quos amet? Reprehenderit blanditiis qui ipsam quidem corporis laudantium illum asperiores tempora pariatur, deleniti voluptates, laboriosam cum porro ut perferendis autem. Eos reiciendis voluptatum eaque iure assumenda repellat vitae culpa, quaerat accusamus omnis atque. Quisquam enim in delectus provident cum doloribus quibusdam minima libero suscipit odio? Dolorum nesciunt nostrum minima atque, itaque eaque ut. Aut sit neque accusantium! Maiores dolor et numquam, animi esse ea deleniti laboriosam architecto nobis amet, voluptate voluptates, quod eveniet eligendi iste officiis hic dolorem repellat nisi nemo labore nam harum? Est voluptatibus nemo dolore tempora ab accusantium necessitatibus modi laborum ipsum non delectus mollitia ipsam corporis id impedit corrupti sed sequi eveniet reiciendis tempore expedita omnis, hic deleniti placeat. Velit, sapiente optio pariatur illum facere ratione a nesciunt sit eos minus iure ab harum voluptas labore quae, unde consequatur maiores perspiciatis neque voluptates quasi ad doloremque similique quibusdam? Ipsa eveniet blanditiis nesciunt odit sed beatae commodi accusamus doloribus quis sequi, qui quo laboriosam id facilis in, temporibus natus veniam perspiciatis corrupti nostrum quod iure voluptas? Ut aperiam asperiores praesentium dolor commodi, facere labore sunt ipsam, enim obcaecati id voluptates maxime blanditiis vitae deleniti, distinctio quaerat animi recusandae repudiandae quos. Ipsum, ullam.',
		gambar: fs.readFileSync(`./public/images/${path}.jpg`),
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
			bookGenerator('History of Worldwide Pandemic', 'contoh-cover-buku-ajar'),
			bookGenerator('Paths to become entrepreneurs', 'Paths-to-become-entrepreneurs'),
			bookGenerator('Kebudayaan Indonesia Dimata Orang Korea', 'Kebudayaan-Indonesia-Dimata-Orang-Korea'),
			bookGenerator('Change Your Destiny', 'Change-your-destiny'),
			bookGenerator('Muda Berdaya Karya Raya', 'Muda-Berdaya-Karya-Raya'),
			bookGenerator('Lancar Berbicara: Kapan, Dimana, dan Dengan Siapa Saja', 'Lancar-bicara'),
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
			// bookGenerator('Home Sweet Loan', 'Home_Sweet_Loan_cov'),
			// bookGenerator('Rich Dad - Increase Your Financial IQ', 'RICH-DADS'),
			// bookGenerator('Lepas Landas', 'Lepas-landas'),
			// bookGenerator('How To Think Like Sherlock Holmes', 'How To Think Like Sherlock Holmes'),
			// bookGenerator('Battle Story : Somme 1916', 'Battle Story Somme 1916'),
			// bookGenerator('Yuval Noah H: Sapiens (Sc)', 'Sapiens (Sc)'),
			// bookGenerator('James M Russell: Brief Guide To Business Classics (SC)', 'Brief Guide To Business Classics (SC)'),
			// bookGenerator('Tara Westover: Educated A Memoir', 'Educated A Memoir'),
			// bookGenerator('Atomic Habits: Perubahan Kecil yang Memberikan Hasil Luar Biasa', 'Atomic Habits'),
			// bookGenerator('Pulang-Pergi', 'pulang-pergi_tere_liye'),
			// bookGenerator('Buku Anak Harry Potter dan Piala Api (Harry Potter and The Goblet of Fire)', 'Buku Anak Harry Potter dan Piala Api (Harry Potter and The Goblet of Fire)'),
			// bookGenerator('Penelusuran Benang Merah (A Study In Scarlet)', 'Penelusuran Benang Merah'),
			// bookGenerator('Ergonomi Industri', 'Ergonomi Industri'),
			// bookGenerator('Why? The Wealth of Nations (Adam Smith)', 'The Wealth of Nations'),
			// bookGenerator('Pria Bernama Ove (A Man Called Ove)', 'Pria Bernama Ove'),
			// bookGenerator('Tanpa Dirimu Aku Bahagia', 'Tanpa Dirimu Aku Bahagia'),
			// bookGenerator('LC: Attack on Titan 32', 'Attack on Titan 32'),
			// bookGenerator('You Do You: Discovering Life through Experiments & Self-Awareness', 'Discovering Life through'),
			// bookGenerator('Indonesia Mental Health First Aid Booklet Panduan Pertolongan Pertama Kesehatan', 'Mental Health First'),
			// bookGenerator('Bung Karno Penyambung Lidah Rakyat Indonesia Edisi Revisi 2', 'Bung Karno Penyambung Lidah Rakyat Indonesia'),
			// bookGenerator('The Star and I', 'The Star and I'),
			// bookGenerator('Memilih (Menjadi Investor) Bahagia', 'Memilih (Menjadi Investor) Bahagia'),
			// bookGenerator('The Intelligent Investor (Edisi Revisi)', 'The Intelligent Investor (Edisi Revisi)'),
			// bookGenerator('Kompetensi SDM di Era 4.0', 'Kompetensi SDM di Era 4.0'),
			// bookGenerator('Analisis Dampak Kebijakan Menggunakan Model Computable General', 'Analisis Dampak Kebijakan Menggunakan Model Computable General'),
			// bookGenerator('Technical Analysis For Mega Profit', 'Technical Analysis For Mega Profit'),
			// bookGenerator('BTS X EXO (Exclusive Book)', 'BTS X EXO (Exclusive Book)'),
			// bookGenerator('Strategi Bisnis Bank Syariah', 'Strategi Bisnis Bank Syariah'),
			// bookGenerator('Jurnal Harga Satuan Bahan Bangunan Konstruksi Dan Interior Edisi 38 2019', 'Jurnal Harga Satuan Bahan Bangunan'),
			// bookGenerator('Arsitektur Kota', 'Arsitektur Kota'),
			// bookGenerator('Bts, To All The Youngsters Without Dreams', 'Bts, To All The Youngsters Without Dreams'),
			// bookGenerator('Income Pentagon', 'Income Pentagon'),
			// bookGenerator('Hbr Guide To Delivering Effective Feedback', 'melangkah'),
			// bookGenerator('The History Of Java', 'The History Of Java'),
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('tbl_bukus', null, {});
	},
};
