const Celebrity = require("../models/Celebrity.model");

module.exports.list = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/list", { celebrities });
    })
    .catch((e) => next(e));
};

module.exports.create = (req, res, next) => {
  res.render("celebrities/new");
};

module.exports.doCreate = (req, res, next) => {
  console.info("ENTRO", req.body);

  Celebrity.create(req.body)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((e) => {
      console.error(e);
      res.render("celebrities/new");
    });
};

module.exports.detail = (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      res.render("celebrities/detail", { celebrity });
    })
    .catch((e) => next(e));
};

module.exports.delete = (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((e) => next(e));
};

module.exports.edit = (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      res.render("celebrities/edit", { celebrity });
    })
    .catch((e) => next(e));
};

module.exports.doEdit = (req, res, next) => {
  Celebrity.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((e) => next(e));
};