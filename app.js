// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./config/db.config");
require("./config/hbs.config");
const { sessionConfig, loggedUser } = require("./config/session.config");

const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const path = require("path");

const logger = require("morgan");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://express-main-app-25.fly.dev/"],
  })
);

app.use(logger("dev"));

// To have access to `body` property in the request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Normalizes the path to the views folder
app.set("views", path.join(__dirname, "views"));
// Sets the view engine to handlebars
app.set("view engine", "hbs");
// Handles access to the public folder
app.use(express.static(path.join(__dirname, "public")));

console.log(module.exports);

app.use(sessionConfig);
app.use(loggedUser);

const routes = require("./routes/routes");
const celebritiesRoutes = require("./routes/routes.celebrities");

app.use("/", routes);
app.use("/celebrities", celebritiesRoutes);

// Error handling
app.use((req, res, next) => {
  res.status(404);
  res.render("not-found");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

module.exports = app;
