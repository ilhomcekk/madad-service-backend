const News = require("../models/news");

// create route
exports.news_create = async (req, res) => {
  const newNews = new News({
    name: req.body.name_ru,
    name_ru: req.body.name_ru,
    name_uz: req.body.name_uz,
    name_en: req.body.name_en,
    description_ru: req.body.description_ru,
    description_uz: req.body.description_uz,
    description_en: req.body.description_en,
    photo: req.file ? req.file.filename : "",
    date: req.body.date,
  });
  newNews
    .save()
    .then((news) => res.json({ data: news }))
    .catch((err) => res.status(400).json(err));
};

// create comment for route
exports.news_create_comment = async (req, res) => {
  const news = await News.findById(req.params.id);
  const { name, phone, comment, date } = req.body;
  const newComment = { name, phone, comment, date };
  news.comments.push(newComment);
  await news
    .save()
    .then((news) => res.json({ data: news }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// delete route
exports.news_delete = (req, res) => {
  const id = req.params.id;
  News.findByIdAndDelete(id)
    .then((data) => res.json({ data: data }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// update route
exports.news_update = (req, res) => {
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
  const editNews = {
    name_ru: req.body.name_ru,
    name_uz: req.body.name_uz,
    name_en: req.body.name_en,
    description_ru: req.body.description_ru,
    description_uz: req.body.description_uz,
    description_en: req.body.description_en,
    photo: newPhoto || "",
    date: req.body.date,
  };
  News.findByIdAndUpdate({ _id: id }, { $set: editNews })
    .then(() => res.json({ data: editNews }))
    .catch((err) => res.status(400).json(err));
};

// detail route
exports.news_detail = async (req, res) => {
  const id = req.params.id;
  const news = await News.findById(id);
  await news
    .save()
    .then((detail) => res.json({ data: detail }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// api detail route
exports.api_news_detail = async (req, res) => {
  const id = req.params.id;
  const news = await News.findById(id);
  news.viewCount += 1;
  await news
    .save()
    .then((detail) => res.json({ data: detail }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// search
exports.news_search = async (req, res) => {
  const { query } = req.params;
  const text = { name_ru: { $regex: query, $options: "i" } };
  const results = await News.find(text);
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const pageCount = results.length;
  const mathPageCount = Math.ceil(pageCount / limit);
  const startIndex = (page - 1) * limit;
  await News.find(text)
    .skip(startIndex)
    .limit(limit)
    .then((result) =>
      res.json({
        data: result,
        _meta: {
          page: parseInt(page),
          limit: parseInt(limit),
          pageCount: mathPageCount,
          totalCount: results.length,
        },
      })
    );
};

// read route
exports.news = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const pageCount = await News.find({}).estimatedDocumentCount();
  const mathPageCount = Math.ceil(pageCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  News.find({})
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
        updated: true,
      });
    })
    .catch((err) => res.status(400).json(err));
};
