const express = require('express')
const app = express()
const router = express.Router();
module.exports = router;
const blogModel = require('../models/Blog')
var multer = require('multer')
const path = require("path");
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const firebaseAdmin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const serviceAccount = require('../firebase.json');
const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});
const storageRef = admin.storage().bucket(`gs://facebookreact-d5338.appspot.com`);

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
    limits: { fileSize: 1048576 },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)) {
            req.fileValidationError = "Only JPG OR PNG allowed!";
            return cb("Only .png and .jpg are allowed! ", false);
        }
        else if (file.size >= 1048576) {
            req.fileValidationError = "file size should be 10mb"
            return cb("file size should be 10mb", false);
        }
        cb(null, true);
    },
}).single("image");



router.post('/createblog/uploadimage', async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            res.send(err)
        } else if (err) {
            res.send(err)
        }
        else{
        
        const filedata = await storageRef.upload(req.file.path, {
            public: true,
            destination: `blogmmo/${req.file.filename}`,
            metadata: {
                firebaseStorageDownloadTokens: uuidv4(),
            }
        });
        res.status(200).send({ image: filedata[0].metadata.mediaLink })
        }
        })

})
router.post('/createblog', (req, res) => {
    let blogpost = new blogModel({
        author: req.body.title,
        title: req.body.title,
        image: req.body.image,
        text: req.body.description,
        // like: req.body.like,
    })
    blogpost.save().then(() => {
        res.status(200).send("Blog creadted successfully")
    })

})
