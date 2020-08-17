module.exports = (sequelize, DataTypes) =>{

    var Gallery = sequelize.define('Gallery', {
        Title:{
            type: DataTypes.STRING
        },
        Location: {
            type: DataTypes.STRING
        },


    });
    return Gallery
};