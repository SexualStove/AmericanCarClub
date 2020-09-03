// import Blog from "../src/components/Blog";

const BlogController = require('./controller/BlogController');
const GalleryController = require('./controller/GalleryController');
const ImageTableController = require('./controller/ImageTableController');
const SendEmail = require('./controller/SendEmail');
//const imageminJpegtran = require('imagemin-jpegtran');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imagemin = require('imagemin');
// const AuthenticationControllerPolicy = require('./policies/BlogPolicies')
const multer = require('multer');


let storageThumbnail = multer.diskStorage(
    {
        destination: './uploads/Thumbnails',
        quality: 20,
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            console.log(file.originalname);
            cb( null, file.originalname);
        }
    }
);
const uploadThumbnail = multer( {
    storage: storageThumbnail
})
let storage = multer.diskStorage(
    {
        destination: './uploads',
        quality: 20,
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            //console.log(file.originalname);
            cb( null, file.originalname);
        }
    }
);
const upload = multer({
    storage: storage
});
module.exports = (app) => {
    app.post('/removeGallery', GalleryController.deleteGallery);

    app.post('/', SendEmail.sendMail);

    app.post('/create', BlogController.createBlog);
    // AuthenticationControllerPolicy.register
    app.get('/blog/:blogId', BlogController.getBlog);

    app.get('/blog', BlogController.getAll);

    app.post('/createGallery', GalleryController.createGallery);

    app.get('/Gallery', GalleryController.getAllGallery);

    app.post('/createImage', ImageTableController.createImageTable);

    app.get('/ImageTable:id', ImageTableController.getImageTables);

    app.post('/upload', async(req,res)=> {
        let storage = multer.diskStorage(
            {
                destination: './uploads',
                quality: 20,
                filename: function ( req, file, cb ) {
                    //req.body is empty...
                    //How could I get the new_file_name property sent from client here?
                    //console.log(file.originalname);
                    cb( null, file.originalname);
                }
            }
        );
        const upload = multer({
            storage: storage
        }).single('file');

        upload(req, res, function (err) {
            let filetoupload = req.file;
            let filename = filetoupload.originalname;
            console.log("-" * 50);
            console.log(filename);
            if (err) {
                console.log(err);
                res.status(500).json({status: 500, message: err});
            }
            let temppath = "./uploads/" + filename;
            imagemin([temppath],
                {
                    destination: './uploads/',
                    plugins: [imageminMozjpeg({quality: 70})]
                }).then(result => {
                console.log(result)
            });
        });
        res.status(200).json({status: 200, message: 'File saved successfully'});
    });

    app.post('/uploadThumbnailOLD', uploadThumbnail.single('file'));
    app.post('/uploadOLD', upload.single('file'));
    // app.put('/create', BlogController.uploadThumbnail)

    app.post('/uploadThumbnail',async(req,res)=> {
        let storageThumbnail = multer.diskStorage(
            {
                destination: './uploads/Thumbnails',
                quality: 20,
                filename: function ( req, file, cb ) {
                    //req.body is empty...
                    //How could I get the new_file_name property sent from client here?
                    console.log(file.originalname);
                    cb( null, file.originalname);
                }
            }
        );
        const uploadThumbnail = multer( {
            storage: storageThumbnail
        }).single('file');

        uploadThumbnail(req, res, function (err) {
            let filetoupload = req.file;
            let filename = filetoupload.originalname;
            console.log("-"*50);
            console.log(filename);
            if (err) {
                console.log(err)
                res.status(500).json({status: 500, message: err});
            }
            let temppath = "./uploads/Thumbnails/" + filename;
            imagemin([temppath],
                {
                    destination: './uploads/Thumbnails/',
                    plugins: [imageminMozjpeg({quality: 70})]
                }).then(result => {
                console.log(result)
            });
        });
        res.status(200).json({status: 200, message: 'File saved successfully'});
    });

};

