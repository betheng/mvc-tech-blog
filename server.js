// Import required modules
const express = require("express");
const exphbs = require("express-handlebars");
const allRoutes = require("./controllers");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require("dotenv").config();

// Initialize Express and configure port
const app = express();
const PORT = process.env.PORT || 3001;

// Import database models
const { User, Blog, Comment } = require("./models");

// Configure Express to use JSON and URL-encoded form bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session settings - timeout after 15 mins
const sess = {
  secret: process.env.DB_SESSION_SECRET,
  cookie: {
    maxAge: 15 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Enable session support
app.use(session(sess));

// Set up static files
app.use(express.static("public"));

// Set up Handlebars
const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Set up routes
app.use("/", allRoutes);

// Connect to the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});