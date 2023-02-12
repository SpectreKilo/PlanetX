const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Photos extends Model { }

Photos.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'photos',
    }
)

module.exports = Photos;