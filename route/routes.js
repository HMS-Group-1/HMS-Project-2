const express = require('express');
const { getAllKategori, postKategori } = require('../controller/kategori');

const router = express.Router();

router.get('/kategori/all', getAllKategori);
router.post('/kategori/create', postKategori);

module.exports = router;
