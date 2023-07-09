const Feedback = require("../models/feedback");

// create route
exports.feedback_create = async (req, res) => {
  const newFeedback = new Feedback({
    name: req.body.name,
    description: req.body.description,
    phone: req.body.phone,
    date: req.body.date,
  });
  newFeedback
    .save()
    .then((feedback) => res.json({ data: feedback }))
    .catch((err) => res.status(400).json(err));
};

// delete route
exports.feedback_delete = (req, res) => {
  const id = req.params.id;
  Feedback.findByIdAndDelete(id)
    .then((data) => res.json({ data: data }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// detail route
exports.feedback_detail = async (req, res) => {
  const id = req.params.id;
  await Feedback.findById(id)
    .then((detail) => res.json({ data: detail }))
    .catch((err) => res.status(400).json("Error: " + err));
};

// read route
exports.feedback = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const pageCount = await Feedback.find({}).estimatedDocumentCount();
  const mathPageCount = Math.ceil(pageCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  Feedback.find()
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
