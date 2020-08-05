module.exports = (sequelize, DataTypes) =>{

    var ImageTable = sequelize.define('ImageTable', {
        GalleryLink:{
            type: DataTypes.STRING
        },
        Location: {
            type: DataTypes.STRING
        },


    });
    return ImageTable
};