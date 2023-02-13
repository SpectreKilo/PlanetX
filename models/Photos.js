const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Photos extends Model {}

Photos.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    description: {
      type: DataTypes.STRING,
    },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
        model: "user",
        key: "id"
    },
},
// sub_genre_id: {
//     type: DataTypes.INTEGER,
//     references: {
//         model: "sub_genre",
//         key: "id"
//     },
// },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pictures',
  }
);

module.exports = Photos;