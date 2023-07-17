import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();


// Get all the Blogs
router.get("/blogs", async (req, res) => {
    let collection = db.collection("blogs");
    let pageNo = req.query.pageno;
    let limit = parseInt(req.query.limit);

    
    let results = await collection.find({}).skip((pageNo * limit) - limit).limit(limit).sort({"date": -1}).toArray();
    let resCount = await collection.find({}).toArray();

    res.send({data: results, count: resCount.length, featured: resCount[0]});
});


// Get one Blog
router.get("/blog/:link", async (req, res) => {
    let collection = db.collection("blogs");
    let results = await collection.findOne({ permalink: req.params.link });
    res.send(results);
});


// Insert Blog
router.post("/new", async (req, res) => {
    let newBlog = {
        body: req.body.body,
        permalink: req.body.title.replace(/\s+/g, '-').toLowerCase(),
        author: req.body.author,
        title: req.body.title,
        tags: req.body.tags,
        comment: [],
        date: new Date()
    }

    let collection = db.collection("blogs");
    let results = await collection.insertOne(newBlog);
    res.send(results);
});


// Update Blog
router.patch("/:link", async (req, res) => {
    let updates = {
        $set: {
            body: req.body.body,
            title: req.body.title,
            tags: req.body.tags,
        }
    }

    let collection = db.collection("blogs");
    let results = await collection.updateOne({permalink: req.params.link}, updates);

    res.send(results);
});


// Delete Blog
router.delete("/:link", async (req, res) => {
    let collection = db.collection("blogs");
    let results = await collection.deleteOne({ permalink: req.params.link });
    res.send(results);
});


export default router;