const EXPRESS = require('express');
const IMAGE = require('../models/image.model');
const UPLOADROUTES = EXPRESS.Router();
const USERROUTES = EXPRESS.Router();
const db = require("../config_url").mongoURL;
const multer = require('multer');
// const upload = multer({dest:'uploads/'});
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

UPLOADROUTES.route("/uploadmulter/user/:id").post(upload.single('imageData'), (req, res, next) => {
    console.log(req.body);
    const newImage = new IMAGE({
        owner_id: req.params.id,
        imageName: req.body.imageName,
        imageData: req.file.path
    });
    newImage.save()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                success: true,
                document: result
            });
        })
        .catch((err) => next(err));
});

UPLOADROUTES.route("/user/:id").get(function (req, res) {
    IMAGE.findOne({ owner_id: req.params.id }).then((image) => {
        if (image != null) {
          res.status(200).json({
            image: image,
          });
        } else {
          res.status(400).json({
            image: null,
          });
        }
      });
});

module.exports = UPLOADROUTES;