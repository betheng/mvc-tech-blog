const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// User and Blog associations
User.hasMany(Blog);
Blog.belongsTo(User);

// Blog and Comment associations
Blog.hasMany(Comment);
Comment.belongsTo(Blog);

// User and Comment associations
User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = {
  User,
  Blog,
  Comment
};