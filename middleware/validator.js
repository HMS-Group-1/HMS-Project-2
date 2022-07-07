const { check } = require('express-validator');

exports.loginValidation = [check('email', 'Mohon masukkan email yang sesuai').not().isEmpty().isEmail().normalizeEmail({ gmail_remove_dots: true }), check('password', 'Password minimum 4 karakter').not().isEmpty().isLength({ min: 4 })];

exports.registerValidation = [
	check('nama', 'Nama tidak boleh kosong').not().isEmpty(),
	check('email', 'Mohon masukkan email yang sesuai').not().isEmpty().isEmail().normalizeEmail({ gmail_remove_dots: true }),
	check('password', 'Password minimum 4 karakter').not().isEmpty().isLength({ min: 4 }),
	check('no_telp', 'Nomor telepon minimum 10 digit').not().isEmpty().isLength({ min: 10 }),
];
