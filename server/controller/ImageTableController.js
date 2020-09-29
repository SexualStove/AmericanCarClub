const {ImageTable} = require('../models');
const fs = require('fs');

module.exports = {

    async createImageTable (req, res) {
        try {
            const ImageTableData = await ImageTable.create(req.body);
            res.send(ImageTableData)
        } catch (err) {
            res.status(400).send({

            })
        }
    },
    async deleteImageTable (id) {
        try{
            const images = await ImageTable.findAll({
                    where: {
                        GalleryLink: id
                    }
                }
            );
            //console.log(id);
            //console.log(images);
            let i;
            for(i=0; i < images.length; i++) {
                fs.unlink('../server/uploads/'+images[i].Location, (err) => {
                    if (err) {
                        console.log("failed to delete local image:"+err);
                    } else {
                        console.log('successfully deleted local image');
                    }
                });
            }
        } catch (e) {
            console.log(e)
        }

    },
    async getImageTablesDownload(id) {
        try{
            return await ImageTable.findAll({
                   where: {
                       GalleryLink: id
                   }
               }
           )
        } catch (e) {
            console.log(e)
        }
    },
    async getImageTables (req,res) {
        const CurrentGallery = req.params.id;
        console.log(req.params);
        try{
            const allImageTables = await ImageTable.findAll({
                where: {
                    GalleryLink: CurrentGallery
                }
                }
            );
            res.send({
                Galleries: allImageTables
            })
        } catch (e) {
            console.log(e)
        }
    },
    async uploadThumbnail (req,res) {
        try {
            const upload = await ImageTable.upsert(req.body, {
                where: {
                    Title: req.body.Title
                }
            });
            //console.log(upload);
            res.send({
                message: upload
            })
        } catch (e) {
            console.log(e)
        }
    }

};