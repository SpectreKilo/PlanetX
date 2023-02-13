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