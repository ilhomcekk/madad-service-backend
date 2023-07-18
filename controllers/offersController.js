const Offers = require("../models/offers");

// create route
exports.offers_create = (req, res) => {
  const newOffer = new Offers({
    name_ru: req.body.name_ru,
    name_uz: req.body.name_uz,
    name_en: req.body.name_en,
    category: req.body.category_id,
    description_ru: req.body.description_ru,
    description_uz: req.body.description_uz,
    description_en: req.body.description_en,
    photo: req.file ? req.file.filename : "",
    date: req.body.date,
  });
  newOffer
    .save()
    .then((news) => res.send({ data: news }))
    .catch((err) => res.status(400).json(err));
};

// delete route
exports.offers_delete = (req, res) => {
  const id = req.params.id;
  Offers.findByIdAndDelete(id)
    .then((data) => res.json({ data: data }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// update route
exports.offers_update = (req, res) => {
  const id = req.params.id;
  let newPhoto;
  const handlePhoto = () => {
    if (req.body.photo) {
      newPhoto = req.body.photo;
    }
    if (req.file) {
      newPhoto = req.file.filename;
    }
  };
  handlePhoto();
  const editOffer = {
    name_ru: req.body.name_ru,
    name_uz: req.body.name_uz,
    name_en: req.body.name_en,
    category: req.body.category_id,
    description_ru: req.body.description_ru,
    description_uz: req.body.description_uz,
    description_en: req.body.description_en,
    photo: newPhoto || "",
    date: req.body.date,
  };
  Offers.findByIdAndUpdate({ _id: id }, { $set: editOffer })
    .then(() => res.json({ data: editOffer }))
    .catch((err) => res.status(400).json(err));
};

// detail route
exports.offers_detail = (req, res) => {
  const id = req.params.id;
  Offers.findById(id)
    .populate("category")
    .then((detail) => res.json({ data: detail }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// read route
exports.offers = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const pageCount = await Offers.find({}).estimatedDocumentCount();
  const mathPageCount = Math.ceil(pageCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  Offers.find()
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

exports.offers_by_category = async (req, res) => {
  const category_id = req.params.id;
  const option = { category: category_id };
  const list = await Offers.find(option);
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const mathPageCount = Math.ceil(pageCount / limit);
  const pageCount = list.length;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  await Offers.find(option)
    .sort({ _id: -1 })
    .skip(startIndex)
    .limit(limit)
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
