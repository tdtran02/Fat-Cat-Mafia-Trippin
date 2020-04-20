const EXPRESS = require('express');
const IMAGE = require('../models/image.model');
const USER = require("../models/user.model");
const UPLOADROUTES = EXPRESS.Router();
const USERROUTES = EXPRESS.Router();
const db = require("../config_url").mongoURL;
const multer = require('multer');
var fs = require('fs');
// var ParamsParser = require('paramsParser');
var bodyParser = require('body-parser')

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

// upload for profile image

const userStorage = multer.diskStorage({
    destination: function(req, file, cb){
        // let {userId} = req.params;
        // let dir = `./uploads/${userId}/profile/`;
        cb(null, './uploads/userProfileImage/');
        // check if directory exists
        // if (!fs.existsSync(dir)) {
        //     // if not create directory
        //     fs.mkdirSync(dir);
        //     // fs.exist(dir, exist =>{
        //     //     if(!exist){
        //     //         return fs.mkdir(dir, error => cb(error, dir))
        //     //     }
        //     //     return cb(null, dir)
        //     // })
        // }
        // cb(null, dir);
    },
    filename: function(req, file, cb){
        //cb(null, Date.now() + file.originalname);
        // let {userId} = req.params.id;
        cb(null, `profile-${Date.now()}` + file.originalname);
    }
})

const profileFileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const profileImageUpload = multer({
    storage: userStorage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: profileFileFilter
})

// Routes

UPLOADROUTES.route("/user/profileImage/:id").post(profileImageUpload.single('imageData'), (req, res, next) => {
    console.log(req.body);
    const newImage = new IMAGE({
        owner_id: req.params.id,
        imageCate: req.body.imageCate,
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

UPLOADROUTES.route("/userImageUpdate/:id").put(function(req, res){
    let newImage;
    IMAGE.findOne({
        $and:[
            {owner_id: req.params.id},
            {imageCate: req.body.imageCate}]
    }).then(image =>{
        newImage = image;
        if(image == null){
            console.error("Profile image is not existed.");
            res.status(403).send("User has not upload profile image.");
        }else if(image != null){
            console.log("Profile image is existed in db");
            // let newImageId = image.id;
            console.log(newImage);
            USER.updateOne(
                { _id: req.params.id},
                {
                  $set: {image: newImage.id}
                })
                .then(() => {
                  console.log("User profile image updated");
                  res.status(200).send({ message: "Profile image updated" });
            });
        } else {
            console.error("No image exists in db to update");
            res.status(401).json("No image exists in db to update");
        }
    })
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

UPLOADROUTES.route("/user/profile/:id").get(function (req, res) {
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

UPLOADROUTES.route("/user/profile/:id").delete(function (req, res) {
    IMAGE.remove({ owner_id: req.params.id }).then((image) => {
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