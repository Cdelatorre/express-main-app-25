const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

module.exports.list = (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((movies) => {
      res.render("movies/list", { movies });
    })
    .catch((e) => next(e));
};

module.exports.create = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new", { celebrities });
    })
    .catch((e) => next(e));
};

module.exports.doCreate = (req, res, next) => {
  console.log("BODY ----->", req.body);
  Movie.create(req.body)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((e) => {
      console.error(e);
      res.redirect("/movies/new");
    });
};

module.exports.detail = (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/detail", { movie });
    })
    .catch((e) => next(e));
};

module.exports.delete = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((e) => next(e));
};

module.exports.edit = (req, res, next) => {
  Promise.all([Movie.findById(req.params.id), Celebrity.find()])
    .then(([movie, celebrities]) => {
      res.render("movies/edit", { movie, celebrities });
    })
    .catch((e) => next(e));
};

module.exports.doEdit = (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((e) => next(e));
};
