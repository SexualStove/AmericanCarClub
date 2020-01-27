const {Gallery} = require('../models');


module.exports = {
    async createGallery (req, res) {
        try {
            const GalleryData = await Gallery.create(req.body);
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

            const Gallery = await Gallery.findOne({
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
    async getAllGallery (req,res) {
        try{
            const allGalleries = await Gallery.findAll();
            res.send({
                Galleries: allGalleries
            })
        } catch (e) {
            console.log(e)
        }
    },
    async uploadThumbnail (req,res) {
        try {
            const upload = await Gallery.upsert(req.body, {
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