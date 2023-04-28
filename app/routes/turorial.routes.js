module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/APIv1.0/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/APIv1.0/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/APIv1.0/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/APIv1.0/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/APIv1.0/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/APIv1.0/:id", tutorials.delete);

  // Delete all Tutorials
  router.delete("/APIv1.0/", tutorials.deleteAll);

  app.use('/APIv1.0/api/tutorials', router);
};
