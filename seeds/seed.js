const sequelize = require('../config/connection');
const { User, BlogPost, Comment, Genre, SubGenre } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const galaxyData = require('./galaxyData.json');
const planetData = require('./planetData.json');
const flagData = require('./flagData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    
    const galaxy = await Genre.bulkCreate(galaxyData)
    const planet = await SubGenre.bulkCreate(planetData)

    for (const blogPost of blogData) {
        await BlogPost.create({
            ...blogPost,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        })
    }

    const flag = await Comment.bulkCreate(flagData)

    process.exit(0);
};

seedDatabase();