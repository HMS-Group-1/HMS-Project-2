const { check } = require('express-validator');
const path = require('path');

exports.loginValidation = [check('email', 'Mohon masukkan email yang sesuai').not().isEmpty().isEmail().normalizeEmail({ gmail_remove_dots: true }), check('password', 'Password minimum 4 karakter').not().isEmpty().isLength({ min: 4 })];

exports.registerValidation = [
	check('nama', 'Nama tidak boleh kosong').not().isEmpty(),
	check('nama', 'Nama tidak boleh angka').not().isNumeric(),
	check('email', 'Masukkan email yang sesuai').not().isEmpty().isEmail().normalizeEmail({ gmail_remove_dots: true }),
	check('password', 'Password minimum 4 karakter').not().isEmpty().isLength({ min: 4 }),
	check('no_telp', 'Wajib 10 angka').not().isEmpty().isLength({ min: 10, max: 10 }),
	check('no_telp', 'Nomor wajib angka').isNumeric(),
];

exports.bookCreateValidation = [
	check('tahun_terbit', 'Tahun terbit tidak boleh berupa huruf').isNumeric(),
	check('tahun_terbit', 'Tahun terbit tidak boleh kosong!').not().isEmpty(),
	check('tahun_terbit', 'Tahun terbit diisi dengan format YYYY').isLength({ min: 4, max: 4 }),
	check('stok', 'Stok tidak boleh kosong').not().isEmpty(),
	check('stok', 'Stok harus Angka').isNumeric(),
	check('judul_buku', 'Judul buku tidak boleh kosong').not().isEmpty(),
	check('kategori_id', 'Kategori tidak boleh kosong').not().isEmpty(),
	check('deskripsi', 'Deskripsi tidak boleh kosong').not().isEmpty(),
	check('rak_id', 'Rak tidak boleh kosong').not().isEmpty(),
	check('gambar')
		.custom((value, fileName) => {
			console.log(fileName);
			if (fileName.req.files.gambar.length == 0) {
				return false;
			} else {
				return true;
			}
		})
		.withMessage('Gambar tidak boleh kosong!'),
];

exports.bookUpdateValidation = [
	check('tahun_terbit', 'Tahun terbit tidak boleh berupa huruf').isNumeric(),
	check('tahun_terbit', 'Tahun terbit tidak boleh kosong!').not().isEmpty(),
	check('tahun_terbit', 'Tahun terbit diisi dengan format YYYY').isLength({ min: 4, max: 4 }),
	check('stok', 'Stok tidak boleh kosong').not().isEmpty(),
	check('stok', 'Stok harus Angka').isNumeric(),
	check('judul_buku', 'Judul buku tidak boleh kosong').not().isEmpty(),
	check('kategori_id', 'Kategori tidak boleh kosong').not().isEmpty(),
	check('deskripsi', 'Deskripsi tidak boleh kosong').not().isEmpty(),
	check('rak_id', 'Rak tidak boleh kosong').not().isEmpty(),
];

exports.userUpdateValidationAdmin = [
	check('nama', 'Nama tidak boleh kosong').not().isEmpty(),
	check('email', 'Email tidak boleh kosong').not().isEmpty(),
	check('email', 'Masukkan email yang sesuai').isEmail().normalizeEmail({ gmail_remove_dots: true }),
	check('no_telp', 'Nomor telepon wajib 10 angka').not().isEmpty().isLength({ min: 10, max: 10 }),
	check('no_telp', 'Nomor telepon wajib angka').isNumeric(),
	check('role')
		.not()
		.isEmpty()
		.custom((role) => {
			if (role == 'admin' || 'anggota') {
				return true;
			} else {
				return false;
			}
		})
		.withMessage('Hanya boleh admin atau anggota'),
];
