const {Gallery} = require('../models');
const ImageTable = require('../controller/ImageTableController');
const fs = require('fs');

module.exports = {
    async createGallery (req, res) {
        try {
            const GalleryData = await Gallery.create(req.body);
            //console.log(req.body);
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
            //console.log('HERE IS THE ERROR', Gallery.dataValues);
            if(!Gallery) {
                //console.log("DO I GET HERE");
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
            const allGalleries = await Gallery.findAll({
            });
            res.send({
                Galleries: allGalleries
            })
        } catch (e) {
            console.log(e)
        }
    },
    async deleteGallery (req, res) {
      try {
          await ImageTable.deleteImageTable(req.body.id);

          fs.unlink('../server/uploads/Thumbnails/'+req.body.Thumbnail, (err) => {
              if (err) {
                  console.log("failed to delete local image:"+err);
              } else {
                  console.log('successfully deleted local image');
              }
          });


          console.log(req.body);
          const upload = await  Gallery.destroy({
              where: {
                  id: req.body.id
              }
          });
          res.send({
              message: upload
          })

      }  catch (e) {
          console.log(e);
          res.status(500).json({status: 500, message: e});
      }
    },

    async uploadThumbnail (req,res) {
        try {
            const upload = await Gallery.upsert(req.body, {
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