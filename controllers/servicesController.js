const Services = require("../models/services");

// create route
exports.services_create = (req, res) => {
  const newServices = new Services({
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
  newServices
    .save()
    .then((services) => res.send({ data: services }))
    .catch((err) => res.status(400).json(err));
};

// delete route
exports.services_delete = (req, res) => {
  const id = req.params.id;
  Services.findByIdAndDelete(id)
    .then((data) => res.json({ data: data }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// update route
exports.services_update = (req, res) => {
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
  const editServices = {
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
  Services.findByIdAndUpdate({ _id: id }, { $set: editServices })
    .then(() => res.json({ data: editServices }))
    .catch((err) => res.status(400).json(err));
};

// detail route
exports.services_detail = async (req, res) => {
  const id = req.params.id;
  Services.findById(id)
    .populate("category")
    .then((detail) => res.json({ data: detail }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// read route
exports.services = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const pageCount = await Services.find({}).estimatedDocumentCount();
  const mathPageCount = Math.ceil(pageCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  Services.find()
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

exports.services_by_category = async (req, res) => {
  const category_id = req.params.id;
  const option = { category: category_id };
  const products = await Services.find(option);
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const pageCount = products.length;
  const mathPageCount = Math.ceil(pageCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  await Services.find(option)
    .sort({ _id: -1 })
    .skip(startIndex)
    .limit(limit)
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
