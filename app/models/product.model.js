const sql = require("./db.js");

// constructor
const Product = function(product) {
  this.name = product.name;
  this.url_image = product.url_image;
  this.price = product.price;
  this.discount = product.discount;
  this.category = product.category;
};

/* Product.create = (newProduct, result) => {
  sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
}; */

Product.findById = (id, result) => {
  sql.query(`SELECT * FROM product WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.findByCat = (cat, result) => {
  sql.query(`SELECT * FROM product WHERE category = ${cat} ORDER BY price ASC`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res);
      result(null, res);
      return;
    }

    // not found Product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.findBySearch = (text, result) => {
  sql.query(`SELECT * FROM product WHERE name LIKE '%${text}%' ORDER BY price ASC`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res);
      result(null, res);
      return;
    }

    // not found Product with the TEXT
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = (title, result) => {
  let query = "SELECT * FROM product ORDER BY price ASC";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

module.exports = Product;
