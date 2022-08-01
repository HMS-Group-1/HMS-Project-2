const models = require('../models');
const tbl_pengembalian = models.tbl_pengembalian;
const tbl_buku = models.tbl_buku;

exports.kembalikanBuku = async (req, res) => {
	try {
		const theBook = await tbl_buku.findOne({
			where: {
				id: req.params.id,
			},
		});
		if (!theBook) return res.status(400).json('Buku tidak ada!');
		await tbl_buku.update(
			{
				stok: theBook.stok + 1,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		const kembalikan = await tbl_pengembalian.create({
			anggota_id: req.userId,
			buku_id: req.params.id,
		});
		res.status(200).json(kembalikan);
	} catch (error) {
		console.log(error);
	}
};
