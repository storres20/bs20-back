module.exports = app => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new Product
  //router.post("/", products.create);

  // Retrieve all Products
  router.get("/", products.findAll);

  //Retrieve a single Product with id
  router.get("/:id", products.findOne);
  
  // Retrieve a single Product with category
  router.get("/cat/:cat", products.findOneCat);
  
  // Retrieve a single Product with search bar
  router.get("/search/:text", products.findSearch);

  app.use('/api/products', router);
};
