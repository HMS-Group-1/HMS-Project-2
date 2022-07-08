const { check } = require('express-validator');

exports.loginValidation = [check('email', 'Mohon masukkan email yang sesuai').not().isEmpty().isEmail().normalizeEmail({ gmail_remove_dots: true }), check('password', 'Password minimum 4 karakter').not().isEmpty().isLength({ min: 4 })];

exports.registerValidation = [
	check('nama', 'Nama tidak boleh kosong').not().isEmpty(),
	check('email', 'Masukkan email yang sesuai').not().isEmpty().isEmail().normalizeEmail({ gmail_remove_dots: true }),
	check('password', 'Password minimum 4 karakter').not().isEmpty().isLength({ min: 4 }).isNumeric(),
	check('no_telp', 'Nomor minimum 1 angka').not().isEmpty().isLength({ min: 1 }),
	check('no_telp', 'Maksimum 10 angka').isLength({ max: 10 }),
];
