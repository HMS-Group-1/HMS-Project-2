const { check } = require('express-validator');

exports.loginValidation = [check('email', 'Mohon masukkan email yang sesuai').not().isEmpty().isEmail().normalizeEmail({ gmail_remove_dots: true }), check('password', 'Password minimum 4 karakter').not().isEmpty().isLength({ min: 4 })];

exports.registerValidation = [
	check('nama', 'Nama tidak boleh kosong').not().isEmpty(),
	check('nama', 'Nama tidak boleh angka').not().isNumeric(),
	check('email', 'Masukkan email yang sesuai').not().isEmpty().isEmail().normalizeEmail({ gmail_remove_dots: true }),
	check('password', 'Password minimum 4 karakter').not().isEmpty().isLength({ min: 4 }),
	check('no_telp', 'Wajib 10 angka').not().isEmpty().isLength({ min: 10, max: 10 }),
	check('no_telp', 'Nomor wajib angka').isNumeric(),
];

exports.bookValidation = [
	check('tahun_terbit', 'Tidak boleh berupa huruf').isNumeric(),
	check('tahun_terbit', 'Tidak boleh kosong!').not().isEmpty(),
	check('tahun_terbit', 'Format YYYY').isLength({ min: 4, max: 4 }),
	check('stok', 'Tidak boleh kosong').not().isEmpty(),
	check('stok', 'Harus Angka').isNumeric(),
	check('judul_buku', 'Tidak boleh kosong').not().isEmpty(),
	check('kategori_id', 'Tidak boleh kosong').not().isEmpty(),
	check('deskripsi', 'Tidak boleh kosong').not().isEmpty(),
	check('rak_id', 'Tidak boleh kosong').not().isEmpty(),
];

exports.userUpdateValidationAdmin = [
	check('nama', 'Tidak boleh kosong').not().isEmpty(),
	check('no_telp', 'Wajib 10 angka').not().isEmpty().isLength({ min: 10, max: 10 }),
	check('no_telp', 'Nomor wajib angka').isNumeric(),
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
