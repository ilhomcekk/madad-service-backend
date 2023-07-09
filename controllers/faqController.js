const Faq = require("../models/faq");

// create route
exports.faq_create = (req, res) => {
  const newFaq = new Faq({
    question_ru: req.body.question_ru,
    question_uz: req.body.question_uz,
    question_en: req.body.question_en,
    answer_ru: req.body.answer_ru,
    answer_uz: req.body.answer_uz,
    answer_en: req.body.answer_en,
    date: req.body.date,
  });
  newFaq
    .save()
    .then((faq) => res.send({ data: faq }))
    .catch((err) => res.status(400).json(err));
};

// delete route
exports.faq_delete = (req, res) => {
  const id = req.params.id;
  Faq.findByIdAndDelete(id)
    .then((data) => res.json({ data: data }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// update route
exports.faq_update = (req, res) => {
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
  const editFaq = {
    question_ru: req.body.question_ru,
    question_uz: req.body.question_uz,
    question_en: req.body.question_en,
    answer_ru: req.body.answer_ru,
    answer_uz: req.body.answer_uz,
    answer_en: req.body.answer_en,
    photo: newPhoto || "",
    date: req.body.date,
  };
  Faq.findByIdAndUpdate({ _id: id }, { $set: editFaq })
    .then(() => res.json({ data: editFaq }))
    .catch((err) => res.status(400).json(err));
};

// detail route
exports.faq_detail = (req, res) => {
  const id = req.params.id;
  Faq.findById(id)
    .then((detail) => res.json({ data: detail }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// read route
exports.faq = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const pageCount = await Faq.find({}).estimatedDocumentCount();
  const mathPageCount = Math.ceil(pageCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  Faq.find()
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
