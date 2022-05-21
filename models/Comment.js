const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Comment extends Model {}

Comment.init({

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
          }
    },

    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post',
            key: 'id'
        }
  }
},
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;