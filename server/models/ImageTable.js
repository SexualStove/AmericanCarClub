module.exports = (sequelize, DataTypes) =>{

    var ImageTable = sequelize.define('ImageTable', {
        GalleryLink:{
            type: DataTypes.STRING
        },
        Image: {
            type: DataTypes.STRING
        },


    });
    return ImageTable
};