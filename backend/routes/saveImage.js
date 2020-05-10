const EXPRESS = require('express');
const IMAGE = require('../models/image.model');
const USER = require("../models/user.model");
const TRIP = require("../models/trip.model");
const UPLOADROUTES = EXPRESS.Router();
const USERROUTES = EXPRESS.Router();
const db = require("../config_url").mongoURL;
const multer = require('multer');
var fs = require('fs');
const path = require('path');
// var ParamsParser = require('paramsParser');
var bodyParser = require('body-parser')
// const PATHS = {
//     react: path.join(__dirname, 'node_modules/react/dist/react.min.js'),
//     app: path.join(__dirname, 'src/uploads/'),
//     build: path.join(__dirname, './dist')
// };

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
        cb(null, '../src/components/uploads/userProfileImage/');
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

// upload trip photo

const tripStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../src/components/uploads/tripProfileImage/');
    },
    filename: function(req, file, cb){
        cb(null, `trip-${Date.now()}` + file.originalname);
    }
})

const tripFileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'|| file.mimetype === 'image/jpg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const tripImageUpload = multer({
    storage: tripStorage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: tripFileFilter
})

// Routes
UPLOADROUTES.route("/uploads/profile").get(function(req,res){
    IMAGE.find({imageCate: req.body.imageCate}).then((image) => {
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
UPLOADROUTES.route("/user/profileImage/:id").post(profileImageUpload.single('imageData'), (req, res, next) => {
    console.log(req.body);
    const newImage = new IMAGE({
        owner_id: req.params.id,
        imageCate: req.body.imageCate,
        imageName: res.req.file.filename,
        imageData: req.file.path
    });
    newImage.save()
        .then((result) => {
            USER.updateOne(
                { _id: req.params.id},
                {
                  $set: {image: newImage.imageName}
                })
                .then(() => {
                  console.log("User profile image:id updated");
                  //res.status(200).send({ message: "Profile image:id updated" });
            });
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
            console.log("Profile image is existed in db.");
            // let newImageId = image.id;
            console.log(newImage);
            USER.updateOne(
                { _id: req.params.id},
                {
                  $set: {image: newImage.id}
                })
                .then(() => {
                  console.log("User profile image:id updated");
                  res.status(200).send({ message: "Profile image:id updated" });
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

// delete by user ID, each user has only one profile image
UPLOADROUTES.route("/user/profile/:id").delete(function (req, res) {
    IMAGE.findOneAndRemove({ owner_id: req.params.id }).then((image) => {
        if (image != null) {
            fs.unlinkSync(image.imageData);
            console.log('successfully deleted user profile image');
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

// delete by image.id from image storage
const DIR = 'uploads/userProfileImage';
UPLOADROUTES.route('/uploads/profile/delete/:id').delete(function (req, res) {
    message : "Error! in image upload.";
    if (!req.params.id) {
        console.log("No file received");
        message = "Error! in image delete.";
        return res.status(500).json('error in delete');
    } else {
        console.log('file received');
        console.log(req.params.id);
        IMAGE.findById({ _id: req.params.id}).then((image) =>{
            try {
                //fs.unlinkSync(DIR+'/'+req.params.imageName+'.png');
                fs.unlinkSync(image.imageData);
                console.log('successfully deleted user profile image');
                return res.status(200).send('Successfully! Image has been Deleted');
            } catch (err) {
                // handle the error
                return res.status(400).send(err);
            }
        })
      }
});

// Trip image upload route

UPLOADROUTES.route("/trip/image/:id").post(tripImageUpload.single('imageData'), (req, res, next) => {
    console.log(req.body);
    const newImage = new IMAGE({
        // !!!!HERE:owner_id means trip_id for trip image
        owner_id: req.params.id,
        imageCate: req.body.imageCate, // imageCate: "trip", category
        imageName: res.req.file.filename,
        imageData: req.file.path
    });
    newImage.save()
        .then((result) => {
            TRIP.updateOne(
                { _id: req.params.id},
                {
                  $set: {trip_image: newImage.imageName}
                })
                .then(() => {
                  console.log("Trip image: updated");
                  //res.status(200).send({ message: "Profile image:id updated" });
            });
            console.log(result);
            res.status(200).json({
                success: true,
                document: result
            });
        })
        .catch((err) => next(err)); 
});

// delete trip image by trip ID, each trip has only one image
UPLOADROUTES.route("/trip/deleteImage/:id").delete(function (req, res) {
    // owner_id is trip_id!!
    IMAGE.findOneAndRemove({ owner_id: req.params.id }).then((image) => {
        if (image != null) {
            fs.unlinkSync(image.imageData);
            console.log('successfully deleted trip image');
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

// delete by trip ID, each trip has only one profile image
UPLOADROUTES.route("/trip/profile/:id").delete(function (req, res) {
    // !!!owner_id = trip_id
    IMAGE.findOneAndRemove({ owner_id: req.params.id }).then((image) => {
        if (image != null) {
            fs.unlinkSync(image.imageData);
            console.log('successfully deleted trip profile image');
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