const {Blog} = require('../models');


module.exports = {
    async createBlog (req, res) {
        try {
            const blogData = await Blog.create(req.body);
            console.log(req.body)
            res.send(blogData)
        } catch (err) {
            res.status(400).send({

            })
        }
    },
    async getBlog (req,res) {
        try{
            const blogId = req.params.blogId;

            const blog = await Blog.findOne({
                where: {
                    id: blogId
                }
            });
            console.log('HERE IS THE ERROR', blog.dataValues);
            if(!blog) {
                console.log("DO I GET HERE");
                res.status(403).send({
                    error: ' Blog Post does not exist'
                })
            }
            const blogJson = blog.toJSON();

            res.send({
                blog: blogJson
            })


        } catch (e) {
            res.status(400).send({
                error: e
            })
        }
    },
    async getAll (req,res) {
        try{
            const allBlogs = await Blog.findAll();
            res.send({
                Blogs: allBlogs
            })
        } catch (e) {
            console.log(e)
        }
    },
    async uploadThumbnail (req,res) {
        try {
            const upload = await Blog.upsert(req.body, {
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