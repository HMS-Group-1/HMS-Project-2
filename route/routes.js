const express = require('express');
const { getAllUsers, updateUsers, deleteUsers } = require('../controller/admin');
const { getBooks, createBooks, updateBooks, deleteBooks, getBookById, getBooksPaginated, categoryWithBooks } = require('../controller/bookcontroller');
const { refreshToken } = require('../controller/getrefreshtoken');
const { getAllKategori } = require('../controller/kategori');
const { Register, Login, Logout } = require('../controller/useraccesscontrol');
const { loginValidation, registerValidation, bookValidation, userUpdateValidationAdmin } = require('../middleware/validator');
const { verifyAdmin, verifyUser } = require('../middleware/verifyuserrole');
const { verifyUserToken } = require('../middleware/verifyusertoken');

const router = express.Router();

// router user
router.post('/register', registerValidation, Register);
router.post('/login', loginValidation, Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

// router book
router.get('/book', verifyUserToken, verifyUser, getBooksPaginated);
router.get('/book/:id', verifyUserToken, verifyUser, getBookById);

//route kategori
router.get('/kategori', getAllKategori);
router.get('/kategori/book', categoryWithBooks);

// router admin--user
router.get('/admin/user', verifyUserToken, verifyAdmin, getAllUsers);
router.patch('/admin/updateUser/:id', verifyUserToken, verifyAdmin, userUpdateValidationAdmin, updateUsers);
router.delete('/admin/deleteUser/:id', verifyUserToken, verifyAdmin, deleteUsers);

// router admin--book
router.get('/admin/book', verifyUserToken, verifyAdmin, getBooks);
router.get('/admin/book/:id', verifyUserToken, verifyAdmin, getBookById);
router.post('/admin/createBook', verifyUserToken, verifyAdmin, bookValidation, createBooks);
router.patch('/admin/updateBook/:id', verifyUserToken, verifyAdmin, bookValidation, updateBooks);
router.delete('/admin/deleteBook/:id', verifyUserToken, verifyAdmin, deleteBooks);

// router admin--category
router.get('/admin/kategori', verifyUserToken, verifyUser, getAllKategori);
router.get('/admin/kategori/book', verifyUserToken, verifyAdmin, categoryWithBooks);

module.exports = router;
