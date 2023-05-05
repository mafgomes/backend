module.exports = app => {
  const livros = require("../controllers/livro.controller.js");

  var router = require("express").Router();

  // Middleware to generate monitoring logs
  app.use(async (req, res, next) => {
    await console.log('=====>   URL   <=====');
    await console.log(req.url);
    await console.log('=====> Params  <=====');
    await console.log(req.params);
    await console.log('=====>   Query <=====');
    await console.log(req.query);
    await console.log('=====> Headers <=====');
    await console.log(req.headers);
    await console.log('=====>   Body  <=====');
    await console.log(req.body);
    await console.log('=====================');
    next();
  });

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

  // Middleware to control API version
  app.use('/v1.0', router);
};
