const router = require("express").Router();
const celebritiesController = require("../controllers/celebrity.controller");

router.get("/", celebritiesController.list);
router.get("/new", celebritiesController.create);
router.post("/", celebritiesController.doCreate);
router.get("/:id", celebritiesController.detail);
router.post("/delete/:id", celebritiesController.delete);
router.get("/edit/:id", celebritiesController.edit);
router.post("/edit/:id", celebritiesController.doEdit);

module.exports = router;
