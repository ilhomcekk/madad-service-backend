const express = require("express");
const router = express.Router();
const upload = require("../utils/storage");

const news = require("../controllers/newsController");

// create route
router.post("/news/create", upload.single("photo"), news.news_create);

// create comment for route
router.post("/news/:id/create", news.news_create_comment);

// delete route
router.delete("/news/delete/:id", news.news_delete);

// update route
router.put("/news/:id/update", upload.single("photo"), news.news_update);

// detail route
router.get("/news/:id", news.news_detail);

// api detail route
router.get("/api/news/:id", news.api_news_detail);

// search
router.get("/news/search/:query", news.news_search);

// read route
router.get("/news", news.news);

module.exports = router;
