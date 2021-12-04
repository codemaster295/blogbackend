const express = require('express')
const app = express()
const router = express.Router();
module.exports = router;
const blogModel = require('../models/Blog')
var multer = require('multer')
const path = require("path");
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: Storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|JPG|png|PNG)$/)) {
            req.fileValidationError = "Only JPG OR PNG allowed!";
            return cb("Only .png and .jpg are allowed! ", false);
        }
        cb(null, true);
    },
}).single("image");



router.post('/createblog/uploadimage', upload, (req, res) => {
    console.log("came")
    console.log(req.file.filename)
    res.status(200).send({ image: `http://localhost:${process.env.PORT}/public/${req.file.filename}` })
})
router.post('/createblog', (req, res) => {
    let blogpost = new blogModel({
        author: req.body.blogTitle,
        image: req.body.image,
        text: req.body.blogDescription,
        // like: req.body.like,
    })
    blogpost.save().then(() => {
        res.status(200).send("Blog created successfully")
    })

})
