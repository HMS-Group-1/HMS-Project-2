const express = require('express');
const { getAllUsers, updateUsers, deleteUsers, getUserById } = require('../controller/admin');
const { getBooks, createBooks, updateBooks, deleteBooks, getBookById, getBooksPaginated, categoryWithBooks, categoryWithBooksById, pinjamBuku, kembalikanBuku } = require('../controller/bookcontroller');
const { refreshToken } = require('../controller/getrefreshtoken');
const { getAllKategori } = require('../controller/kategori');
const { getRaks } = require('../controller/rak');
const { Register, Login, Logout } = require('../controller/useraccesscontrol');
const { loginValidation, registerValidation, bookValidation, userUpdateValidationAdmin } = require('../middleware/validator');
const { verifyAdmin, verifyUser } = require('../middleware/verifyuserrole');
const { verifyUserToken } = require('../middleware/verifyusertoken');

const router = express.Router();

// router user -- administration
router.post('/register', registerValidation, Register);
router.post('/login', loginValidation, Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

// router user -- updateUser
router.patch('/updateuser/:id', verifyUserToken, verifyUser, updateUsers);

// router user--book
router.get('/book', verifyUserToken, verifyUser, getBooksPaginated);
router.get('/book/:id', verifyUserToken, verifyUser, getBookById);
router.post('/pinjam/:id', verifyUserToken, verifyUser, pinjamBuku);
router.patch('/kembalikan/:id', verifyUserToken, verifyUser, kembalikanBuku);

//route kategori -- admin && user
router.get('/kategori', verifyUserToken, getAllKategori);
router.get('/kategori/book', verifyUserToken, categoryWithBooks);
router.get('/kategori/book/:id', verifyUserToken, categoryWithBooksById);

// route rak -- admin && user
router.get('/rak', verifyUserToken, getRaks);

// router admin--user
router.get('/admin/user', verifyUserToken, verifyAdmin, getAllUsers);
router.get('/admin/user/:id', verifyUserToken, verifyAdmin, getUserById);
router.patch('/admin/updateUser/:id', verifyUserToken, verifyAdmin, userUpdateValidationAdmin, updateUsers);
router.delete('/admin/deleteUser/:id', verifyUserToken, verifyAdmin, deleteUsers);

// router admin--book
router.get('/admin/book', verifyUserToken, verifyAdmin, getBooks);
router.get('/admin/book/:id', verifyUserToken, verifyAdmin, getBookById);
router.post('/admin/createBook', verifyUserToken, verifyAdmin, bookValidation, createBooks);
router.patch('/admin/updateBook/:id', verifyUserToken, verifyAdmin, bookValidation, updateBooks);
router.delete('/admin/deleteBook/:id', verifyUserToken, verifyAdmin, deleteBooks);

module.exports = router;
