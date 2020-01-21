module.exports = (sequelize, DataTypes) =>{

    var Gallery = sequelize.define('Gallery', {
        GalleryID:{
            type: DataTypes.STRING
        },
        Title:{
            type: DataTypes.STRING
        },
        Image: {
            type: DataTypes.STRING
        },


    });
    return Gallery
};