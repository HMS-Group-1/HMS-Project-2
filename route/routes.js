const express = require('express');
const { getAllUsers, updateUsers, deleteUsers } = require('../controller/admin');
const { getBooks, createBooks, updateBooks, deleteBooks, getBookById } = require('../controller/bookcontroller');
const { refreshToken } = require('../controller/getrefreshtoken');
const { Register, Login, Logout } = require('../controller/useraccesscontrol');
const { loginValidation, registerValidation } = require('../middleware/validator');
const { verifyRoles } = require('../middleware/verifyuserrole');
const { verifyUserToken } = require('../middleware/verifyusertoken');

const router = express.Router();

// router user
router.post('/register', registerValidation, Register);
router.post('/login', loginValidation, Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

// router book
router.get('/book', verifyUserToken, getBooks);
router.get('/book/:id', verifyUserToken, getBookById);

// router admin--user
router.get('/admin/user', verifyUserToken, verifyRoles, getAllUsers);
router.patch('/admin/updateUser/:id', verifyUserToken, verifyRoles, updateUsers);
router.delete('/admin/deleteUser/:id', verifyUserToken, verifyRoles, deleteUsers);

// router admin--book
router.get('/admin/book', verifyUserToken, verifyRoles, getBooks);
router.get('/admin/book/:id', verifyUserToken, verifyRoles, getBookById);
router.post('/admin/createBook', verifyUserToken, verifyRoles, createBooks);
router.patch('/admin/updateBook/:id', verifyUserToken, verifyRoles, updateBooks);
router.delete('/admin/deleteBook/:id', verifyUserToken, verifyRoles, deleteBooks);

module.exports = router;
