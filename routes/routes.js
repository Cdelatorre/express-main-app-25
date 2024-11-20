const router = require("express").Router();
const miscController = require("../controllers/misc.controller");
const celebritiesController = require("../controllers/celebrity.controller");
const moviesController = require("../controllers/movie.controller");
const authController = require("../controllers/auth.controller");

/* GET home page */
router.get("/", miscController.home);

router.get("/celebrities", celebritiesController.list);
router.get("/celebrities/new", celebritiesController.create);
router.post("/celebrities", celebritiesController.doCreate);
router.get("/celebrities/:id", celebritiesController.detail);
router.post("/celebrities/delete/:id", celebritiesController.delete);
router.get("/celebrities/edit/:id", celebritiesController.edit);
router.post("/celebrities/edit/:id", celebritiesController.doEdit);

router.get("/movies", moviesController.list);
router.get("/movies/new", moviesController.create);
router.post("/movies", moviesController.doCreate);
router.get("/movies/:id", moviesController.detail);
router.post("/movies/delete/:id", moviesController.delete);
router.get("/movies/edit/:id", moviesController.edit);
router.post("/movies/edit/:id", moviesController.doEdit);

router.get("/register", authController.register);
router.post("/register", authController.doRegister);
router.get("/login", authController.login);
router.post("/login", authController.doLogin);

module.exports = router;
