const Tarif = require("../models/tarif");

// create route
exports.tarif_create = async (req, res) => {
  const newTarif = new Tarif({
    name_ru: req.body.name_ru,
    name_uz: req.body.name_uz,
    name_en: req.body.name_en,
    category: req.body.category_id,
    tariffs: req.body.tariffs,
    price: req.body.price,
    date: req.body.date,
  });
  newTarif
    .save()
    .then((tarif) => res.json({ data: tarif }))
    .catch((err) => res.status(400).json(err));
};

// delete route
exports.tarif_delete = (req, res) => {
  const id = req.params.id;
  Tarif.findByIdAndDelete(id)
    .then((data) => res.json({ data: data }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// update route
exports.tarif_update = (req, res) => {
  const id = req.params.id;
  const editTarif = {
    name_ru: req.body.name_ru,
    name_uz: req.body.name_uz,
    name_en: req.body.name_en,
    tariffs: req.body.tariffs,
    price: req.body.price,
    category: req.body.category,
    date: req.body.date,
  };
  Tarif.findByIdAndUpdate({ _id: id }, { $set: editTarif })
    .then(() => res.json({ data: editTarif }))
    .catch((err) => res.status(400).json(err));
};

// detail route
exports.tarif_detail = async (req, res) => {
  const id = req.params.id;
  await Tarif.findById(id)
    .populate("category")
    .then((detail) => res.json({ data: detail }))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.tarif_by_category = async (req, res) => {
  const category_id = req.params.id;
  const option = { category: category_id };
  const products = await Tarif.find(option);
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const pageCount = products.length;
  const mathPageCount = Math.ceil(pageCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  await Tarif.find(option)
    .sort({ _id: -1 })
    .skip(startIndex)
    .limit(limit)
    .populate("category")
    .then((items) => {
      res.json({
        _meta: {
          page: parseInt(page),
          limit: parseInt(limit),
          pageCount: mathPageCount,
          totalCount: products.length,
        },
        data: items,
      });
    })
    .catch((err) => res.status(400).json(err));
};

// read route
exports.tarif = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const pageCount = await Tarif.find({}).estimatedDocumentCount();
  const mathPageCount = Math.ceil(pageCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  Tarif.find()
    .sort({ _id: -1 })
    .skip(startIndex)
    .limit(limit)
    .populate("category")
    .then((items) => {
      res.json({
        _meta: {
          page: parseInt(page),
          limit: parseInt(limit),
          pageCount: mathPageCount,
          totalCount: pageCount,
        },
        data: items,
      });
    })
    .catch((err) => res.status(400).json(err));
};
