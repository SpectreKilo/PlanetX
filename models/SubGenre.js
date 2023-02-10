const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SubGenre extends Model { }

SubGenre.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        subgenre_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'sub_genre',
    }
)

module.exports = SubGenre;