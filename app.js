// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./config/db.config");
require("./config/hbs.config");
// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const path = require("path");

const logger = require("morgan");

const app = express();
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
// 👇 Start handling routes here
const routes = require("./routes/routes");
app.use("/", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

module.exports = app;
