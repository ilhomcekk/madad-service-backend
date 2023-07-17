const Advertising = require("../models/advertising");

// create route
exports.advertising_create = (req, res) => {
  const newAdvertising = new Advertising({
    name_ru: req.body.name_ru,
    name_uz: req.body.name_uz,
    name_en: req.body.name_en,
    description_ru: req.body.description_ru,
    description_uz: req.body.description_uz,
    description_en: req.body.description_en,
    photo: req.file ? req.file.filename : "",
    category: req.body.category_id,
    link: req.body.link,
    date: req.body.date,
  });
  newAdvertising
    .save()
    .then((advertising) => res.send({ data: advertising }))
    .catch((err) => res.status(400).json(err));
};

// delete route
exports.advertising_delete = (req, res) => {
  const id = req.params.id;
  Advertising.findByIdAndDelete(id)
    .then((data) => res.json({ data: data }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// update route
exports.advertising_update = (req, res) => {
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
  const editAdvertising = {
    name_ru: req.body.name_ru,
    name_uz: req.body.name_uz,
    name_en: req.body.name_en,
    description_ru: req.body.description_ru,
    description_uz: req.body.description_uz,
    description_en: req.body.description_en,
    photo: newPhoto || "",
    category: req.body.category_id,
    link: req.body.link,
    date: req.body.date,
  };
  Advertising.findByIdAndUpdate({ _id: id }, { $set: editAdvertising })
    .then(() => res.json({ data: editAdvertising }))
    .catch((err) => res.status(400).json(err));
};

// detail route
exports.advertising_detail = (req, res) => {
  const id = req.params.id;
  Advertising.findById(id)
    .populate("category")
    .then((detail) => res.json({ data: detail }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// read route
exports.advertising = async (req, res) => {
  const category_id = req.params.id;
  const option = { category: category_id };
  const list = await Advertising.find(option);
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const pageCount = await Advertising.find({}).estimatedDocumentCount();
  const mathPageCount = Math.ceil(pageCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  Advertising.find()
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
