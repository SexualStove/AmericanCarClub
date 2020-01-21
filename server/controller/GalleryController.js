const {gallery} = require('../models');


module.exports = {
    async createGallery (req, res) {
        try {
            const GalleryData = await gallery.create(req.body);
            console.log(req.body);
            res.send(GalleryData)
        } catch (err) {
            res.status(400).send({

            })
        }
    },
    async getGallery (req,res) {
        try{
            const GalleryID = req.params.GalleryID;

            const Gallery = await gallery.findOne({
                where: {
                    id: GalleryID
                }
            });
            console.log('HERE IS THE ERROR', Gallery.dataValues);
            if(!Gallery) {
                console.log("DO I GET HERE");
                res.status(403).send({
                    error: ' Blog Post does not exist'
                })
            }
            const GalleryJson = Gallery.toJSON();

            res.send({
                Gallery: GalleryJson
            })


        } catch (e) {
            res.status(400).send({
                error: e
            })
        }
    },
    async getGalleries (req,res) {
        try{
            const allGalleries = await gallery.findAll();
            res.send({
                Galleries: allGalleries
            })
        } catch (e) {
            console.log(e)
        }
    },
    async uploadThumbnail (req,res) {
        try {
            const upload = await gallery.upsert(req.body, {
                where: {
                    Title: req.body.Title
                }
            });
            console.log(upload);
            res.send({
                message: upload
            })
        } catch (e) {
            console.log(e)
        }
    }

};