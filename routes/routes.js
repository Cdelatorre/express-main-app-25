const router = require("express").Router();
const miscController = require("../controllers/misc.controller");
const moviesController = require("../controllers/movie.controller");
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const authMiddlewares = require("../middlewares/auth.middleware");
const adminMiddlewares = require("../middlewares/admin.middleware");
/* GET home page */
router.get("/", miscController.home);
router.get("/panel", adminMiddlewares.isAdmin, miscController.panel);

router.get("/movies", moviesController.list);
router.get("/movies/new", moviesController.create);
router.post("/movies", moviesController.doCreate);
router.get("/movies/:id", moviesController.detail);
router.post("/movies/delete/:id", moviesController.delete);
router.get("/movies/edit/:id", moviesController.edit);
router.post("/movies/edit/:id", moviesController.doEdit);

router.get(
  "/register",
  authMiddlewares.isNotAuthenticated,
  authController.register
);
router.post(
  "/register",
  authMiddlewares.isNotAuthenticated,
  authController.doRegister
);
router.get("/login", authMiddlewares.isNotAuthenticated, authController.login);
router.post(
  "/login",
  authMiddlewares.isNotAuthenticated,
  authController.doLogin
);
router.get("/logout", authController.logout);

router.post(
  "/users/delete/:id",
  adminMiddlewares.isAdmin,
  usersController.delete
);
router.get(
  "/profile",
  authMiddlewares.isAuthenticated,
  usersController.profile
);

module.exports = router;
