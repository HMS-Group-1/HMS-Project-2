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
