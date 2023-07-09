const TariffsServices = require("../models/tariffsServices");

// create route
exports.tariffs_services_create = async (req, res) => {
  const newTariffsServices = new TariffsServices({
    name_ru: req.body.name_ru,
    name_uz: req.body.name_uz,
    name_en: req.body.name_en,
    description_ru: req.body.description_ru,
    description_uz: req.body.description_uz,
    description_en: req.body.description_en,
    category: req.body.category_id,
    photo: req.file ? req.file.filename : "",
    date: req.body.date,
  });
  newTariffsServices
    .save()
    .then((tariffsServices) => res.json({ data: tariffsServices }))
    .catch((err) => res.status(400).json(err));
};

// delete route
exports.tariffs_services_delete = (req, res) => {
  const id = req.params.id;
  TariffsServices.findByIdAndDelete(id)
    .then((data) => res.json({ data: data }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// update route
exports.tariffs_services_update = (req, res) => {
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
  const editTariffsServices = {
    name_ru: req.body.name_ru,
    name_uz: req.body.name_uz,
    name_en: req.body.name_en,
    description_ru: req.body.description_ru,
    description_uz: req.body.description_uz,
    description_en: req.body.description_en,
    category: req.body.category_id,
    photo: newPhoto || "",
    date: req.body.date,
  };
  TariffsServices.findByIdAndUpdate({ _id: id }, { $set: editTariffsServices })
    .then(() => res.json({ data: editTariffsServices }))
    .catch((err) => res.status(400).json(err));
};

// detail route
exports.tariffs_services_detail = async (req, res) => {
  const id = req.params.id;
  await TariffsServices.findById(id)
    .populate("category")
    .then((detail) => res.json({ data: detail }))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.tariffs_services_by_category = async (req, res) => {
  const category_id = req.params.id;
  const option = { category: category_id };
  const products = await TariffsServices.find(option);
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const pageCount = products.length;
  const mathPageCount = Math.ceil(pageCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  await TariffsServices.find(option)
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

// read route
exports.tariffs_services = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const pageCount = await TariffsServices.find({}).estimatedDocumentCount();
  const mathPageCount = Math.ceil(pageCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  TariffsServices.find()
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
