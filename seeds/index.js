const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const users = [
  { username: 'nojo', password: 'password123' },
  { username: 'johne', password: 'mypass' },
  { username: 'kittens4eva', password: 'itsapassword' }
];

const blogs = [
  { title: 'First!', content: 'First post eevverrr!', userId: 1 },
  { title: 'It\'s a second post!', content: 'yeeah!', userId: 1 },
  { title: "Tech is cool", content: "I\'d like to introduce myself", userId: 2 },
  { title: "Today was...", content: "... a great day in Tech!", userId: 2 },
  { title: "Kitten\'s first post!", content: "Meeeeow", userId: 3 }
];

const comments = [
  { body: 'For sure.', blogId: 1, userId: 2 },
  { body: 'Totally.', blogId: 4, userId: 3 },
  { body: 'I agree with that one!', blogId: 2, userId: 1 },
  { body: 'I disagreeeeeeee', blogId: 5, userId: 3 }
];

const plantSeeds = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate(users, { individualHooks: true });
    await Blog.bulkCreate(blogs);
    await Comment.bulkCreate(comments);
    
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

plantSeeds();