const Partners = require("../models/partners");

// create route
exports.partners_create = (req, res) => {
  const newPartners = new Partners({
    name: req.body.name,
    link: req.body.link,
    photo: req.file ? req.file.filename : "",
    date: req.body.date,
  });
  newPartners
    .save()
    .then((partners) => res.send({ data: partners }))
    .catch((err) => res.status(400).json(err));
};

// delete route
exports.partners_delete = (req, res) => {
  const id = req.params.id;
  Partners.findByIdAndDelete(id)
    .then((data) => res.json({ data: data }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// update route
exports.partners_update = (req, res) => {
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
  const editPartners = {
    name: req.body.name,
    link: req.body.link,
    photo: newPhoto || "",
    date: req.body.date,
  };
  Partners.findByIdAndUpdate({ _id: id }, { $set: editPartners })
    .then(() => res.json({ data: editPartners }))
    .catch((err) => res.status(400).json(err));
};

// detail route
exports.partners_detail = (req, res) => {
  const id = req.params.id;
  Partners.findById(id)
    .then((detail) => res.json({ data: detail }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// read route
exports.partners = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const pageCount = await Partners.find({}).estimatedDocumentCount();
  const mathPageCount = Math.ceil(pageCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  Partners.find()
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
