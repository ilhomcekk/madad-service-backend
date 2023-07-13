const Category = require("../models/category");

// create route
exports.category_create = (req, res) => {
  const newCategory = new Category({
    name_ru: req.body.name_ru,
    name_uz: req.body.name_uz,
    name_en: req.body.name_en,
    photo: req.file ? req.file.filename : "",
    date: req.body.date,
  });
  newCategory
    .save()
    .then((category) => res.send({ data: category }))
    .catch((err) => res.status(400).json(err));
};

// delete route
exports.category_delete = (req, res) => {
  const id = req.params.id;
  Category.findByIdAndDelete(id)
    .then((data) => res.json({ data: data }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// update route
exports.category_update = (req, res) => {
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
  const editCategory = {
    name_ru: req.body.name_ru,
    name_uz: req.body.name_uz,
    name_en: req.body.name_en,
    photo: newPhoto || "",
    date: req.body.date,
  };
  Category.findByIdAndUpdate({ _id: id }, { $set: editCategory })
    .then(() => res.json({ data: editCategory }))
    .catch((err) => res.status(400).json(err));
};

// detail route
exports.category_detail = (req, res) => {
  const id = req.params.id;
  Category.findById(id)
    .then((detail) => res.json({ data: detail }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// read route
exports.category = async (req, res) => {
  await Category.find()
    .sort({ _id: -1 })
    .then((items) => {
      res.json({
        data: items,
      });
    })
    .catch((err) => res.status(400).json(err));
};
