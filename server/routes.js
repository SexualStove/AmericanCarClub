// import Blog from "../src/components/Blog";

const BlogController = require('./controller/BlogController');
const GalleryController = require('./controller/GalleryController');
const ImageTableController = require('./controller/ImageTableController');
const SendEmail = require('./controller/SendEmail');
// const AuthenticationControllerPolicy = require('./policies/BlogPolicies')
const multer = require('multer');
let storage = multer.diskStorage(
    {
        destination: './uploads',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            console.log(file.originalname);
            cb( null, file.originalname);
        }
    }
);
const upload = multer({
    storage: storage
});

module.exports = (app) => {
    app.post('/', SendEmail.sendMail);

    app.post('/create', BlogController.createBlog);
    // AuthenticationControllerPolicy.register
    app.get('/blog/:blogId', BlogController.getBlog);

    app.get('/blog', BlogController.getAll);

    app.post('/createGallery', GalleryController.createGallery);

    app.get('/Gallery', GalleryController.getAllGallery);

    app.post('/createImage', ImageTableController.createImageTable);

    app.get('/ImageTable:id', ImageTableController.getImageTables);

    app.post('/upload', upload.single('file'));
    // app.put('/create', BlogController.uploadThumbnail)



};

