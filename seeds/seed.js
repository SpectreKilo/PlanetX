const sequelize = require('../config/connection');
const { User, BlogPost, SubGenre } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const planetData = require('./planetData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const blogPost of blogData) {
        await BlogPost.create({
            ...blogPost,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        })
    };

   
    const planet = await SubGenre.bulkCreate(planetData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();