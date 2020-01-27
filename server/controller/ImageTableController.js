const {ImageTable} = require('../models');


module.exports = {
    async createImageTable (req, res) {
        try {
            const ImageTableData = await ImageTable.create(req.body);
            console.log(req.body);
            res.send(ImageTableData)
        } catch (err) {
            res.status(400).send({

            })
        }
    },
    async getImageTables (req,res) {
        try{
            const allImageTables = await ImageTable.findAll();
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
            console.log(upload);
            res.send({
                message: upload
            })
        } catch (e) {
            console.log(e)
        }
    }

};