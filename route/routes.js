const express = require('express');
const { getAllUsers } = require('../controller/admin');
const { getBooks, createBooks } = require('../controller/bookcontroller');
const { Register, Login, Logout } = require('../controller/useraccesscontrol');
const { verifyRoles } = require('../middleware/verifyuserrole');
const { verifyUserToken } = require('../middleware/verifyusertoken');

const router = express.Router();

// router user
router.post('/register', Register);
router.post('/login', Login);
router.delete('/logout', Logout);

// router book
router.get('/book', getBooks);

// rotuer admin
router.get('/admin/user', verifyUserToken, verifyRoles, getAllUsers);
router.get('/admin/book', verifyUserToken, getBooks);
router.post('/admin/createbook', verifyUserToken, verifyRoles, createBooks);

module.exports = router;
