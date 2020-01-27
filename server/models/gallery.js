module.exports = (sequelize, DataTypes) =>{

    var Gallery = sequelize.define('Gallery', {
        Title:{
            type: DataTypes.STRING
        },
        Image: {
            type: DataTypes.STRING
        },


    });
    return Gallery
};