module.exports = (sequelize, DataTypes) =>{

    var Blog = sequelize.define('Blog', {
        Content:{
            type: DataTypes.TEXT
        },
        Author: {
            type: DataTypes.STRING
        },
        Blurb: {
            type: DataTypes.TEXT
        },
        Title:{
            type: DataTypes.STRING
        },
        When: {
          type: DataTypes.STRING
        },
        Where: {
          type: DataTypes.STRING
        },
        Thumbnail: {
            type: DataTypes.STRING
        },
        Date: {
            type: DataTypes.DATEONLY
        }

    });
    return Blog
};