const Product = require("../models/product.model.js");

// Create and Save a new Product
/* exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Product
  const product = new Product({
    name: req.body.name,
    url_image: req.body.url_image,
    price: req.body.price,
    discount: req.body.discount,
    category: req.body.category
  });

  // Save Product in the database
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    else res.send(data);
  });
}; */

// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Product.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error de conexion. Intente de nuevo"
      });
    else res.send(data);
  });
};

// Find a single Product by Id
exports.findOne = (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Find a single Product by Category
exports.findOneCat = (req, res) => {
  Product.findByCat(req.params.cat, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No hay coincidencias para: "${req.params.cat}".`
        });
      } else {
        res.status(500).send({
          /* message: "Error retrieving Product with CAT " + req.params.cat */
          message: "Error de conexion. Intente de nuevo"
        });
      }
    } else res.send(data);
  });
};

// Find a single Product by Search bar
exports.findSearch = (req, res) => {
  Product.findBySearch(req.params.text, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No hay coincidencias para: "${req.params.text}".`
        });
        /* res.send(data); */
      } else {
        res.status(500).send({
          /* message: "Error retrieving Product with TEXT " + req.params.text */
          message: "Error de conexion. Intente de nuevo"
        });
      }
    } else res.send(data);
  });
};

