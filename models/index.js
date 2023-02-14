const User = require("./User");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");
const Genre = require("./Genre");
const SubGenre = require("./SubGenre");
const Photos = require("./Photos");

Comment.belongsTo(BlogPost, {
    foreignKey: "topic_id",
    onDelete: "CASCADE"
})

BlogPost.hasMany(Comment, {
    foreignKey: "topic_id"
})

Comment.belongsTo(User, {
    foreignKey: "user_id"
})

User.belongsToMany(SubGenre, { through: BlogPost, onDelete: 'SET NULL' });

SubGenre.belongsToMany(User, { through: BlogPost, onDelete: 'SET NULL' });

Genre.hasMany(SubGenre, {
    foreignKey: "genre_id",
})

SubGenre.belongsTo(Genre, {
    foreignKey: "genre_id",
})

User.hasMany(Photos, {
    foreignKey: "user_id",
})

Photos.belongsTo(User, {
    foreignKey: "user_id"
})

module.exports = { User, BlogPost, Comment, Genre, SubGenre, Photos };