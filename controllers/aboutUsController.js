const AboutUs = require("../models/aboutUs");

// create route
exports.aboutUs_create = (req, res) => {
  const newAboutUs = new AboutUs({
    photo: req.file ? req.file.filename : "",
    date: req.body.date,
  });
  newAboutUs
    .save()
    .then((aboutUs) => res.send({ data: aboutUs }))
    .catch((err) => res.status(400).json(err));
};

// delete route
exports.aboutUs_delete = (req, res) => {
  const id = req.params.id;
  AboutUs.findByIdAndDelete(id)
    .then((data) => res.json({ data: data }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// update route
exports.aboutUs_update = (req, res) => {
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
  const editAboutUs = {
    photo: newPhoto || "",
    date: req.body.date,
  };
  AboutUs.findByIdAndUpdate({ _id: id }, { $set: editAboutUs })
    .then(() => res.json({ data: editAboutUs }))
    .catch((err) => res.status(400).json(err));
};

// detail route
exports.aboutUs_detail = (req, res) => {
  const id = req.params.id;
  AboutUs.findById(id)
    .then((detail) => res.json({ data: detail }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// read route
exports.aboutUs = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const pageCount = await AboutUs.find({}).estimatedDocumentCount();
  const mathPageCount = Math.ceil(pageCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  AboutUs.find()
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
