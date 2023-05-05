module.exports = app => {
  const livros = require("../controllers/livro.controller.js");

  var router = require("express").Router();

  // Create a new Book
  router.post("/", livros.create);

  // Retrieve all Books
  router.get("/", livros.findAll);

  // Retrieve all published Books
  router.get("/publicados", livros.findAllPublished);

  // Retrieve a single Book with id
  router.get("/:id", livros.findOne);

  // Update a Book with id
  router.patch("/:id", livros.update);

  // Delete a Book with id
  router.delete("/:id", livros.delete);

  // Delete all Books
  router.delete("/", livros.deleteAll);

  app.use('/v1.0', router);
};
