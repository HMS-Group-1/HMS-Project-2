const models = require('../models');
const tbl_peminjaman = models.tbl_peminjaman;
const tbl_pengembalian = models.tbl_pengembalian;
const tbl_buku = models.tbl_buku;

// Pinjam buku
exports.pinjamBuku = async (req, res) => {
	try {
		const theBook = await tbl_buku.findOne({
			where: {
				id: req.params.id,
			},
		});
		if (!theBook) return res.status(400).json('Buku tidak ada!');
		if (theBook.stok == 0) return res.status(404).json('Stok tidak ada!');
		await tbl_buku.update(
			{ stok: theBook.stok - 1 },
			{
				where: {
					id: req.params.id,
				},
			}
		);
		await tbl_peminjaman.create({
			anggota_id: req.userId,
			buku_id: req.params.id,
			isPinjam: true,
		});

		await tbl_pengembalian.create({
			anggota_id: req.userId,
			buku_id: req.params.id,
		});

		res.status(200).json('Berhasil Pinjam');
	} catch (error) {
		console.log(error);
	}
};
