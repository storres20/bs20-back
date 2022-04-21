
<h1 align="center">Bsale Test - Backend</h1>

https://bs20-back.vercel.app/

```json
{
"message": "Welcome to bs20-back API application."
}
```

### Tabla de contenidos:
---

- [Descripción y contexto](#descripción-y-contexto)
- [Guía de usuario](#guía-de-usuario)
- [Peticiones a la API](#peticiones-a-la-api)
  - [Peticiones de productos](#peticiones-de-productos)
  - [Peticiones de categorias](#peticiones-de-categorias)
  - [Peticiones de filtrado por categoria](#peticiones-de-filtrado-por-categoria)
  - [Peticiones de filtrado por nombre](#peticiones-de-filtrado-por-nombre)
  - [Errores](#errores)
- [Guía de instalación](#guía-de-instalación)
- [Información adicional](#información-adicional)


### Descripción y contexto
---

💻📱 **Bsale Test - Backend** 💻📱 es una **API** que atiende las peticiones de datos que provienen desde el lado del cliente (Frontend) 💻💻💻

La API realiza consultas a las tablas "product" y "category" de la Base de Datos y envia las respuestas al cliente, respecto a la busqueda de productos diversos a adquirir.

Puedes acceder a la API a traves de: <a href="https://bs20-back.vercel.app/" target="_blank">https://bs20-back.vercel.app/</a>


### Guía de usuario
---

## Peticiones a la API
<h1 align="center">Peticiones a la API</h1>

Al iniciar la plataforma web de 🛍 🛒 **Bsale Test - Frontend** 🛍 🛒; desde el lado del cliente se realizarán `02 peticiones` a la `API del backend` para solicitar los datos de los `productos` y los datos de las `categorias`

La API establece una conexion hacia la Base de Datos suministrada por la empresa

`Nota:` Los `productos` estan alojados en la tabla `product` de la base de datos suministrados por la empresa

| `🔭Tabla` | `⚡"product"` |
| :------ | :------ |
| id | Identificador unicod del producto (int) |
| name | Nombre del producto (varchar) |
| url_image | URL de la imagen asociada al producto (varchar) |
| price | Precio de venta del producto (float) |
| discount | Porcentaje de descuento del producto (int) |
| category | Identificador de la categoria (int) |

`Nota:` Las `categorias` estan alojadas en la tabla `category` de la base de datos suministrados por la empresa

| `🔭Tabla` | `⚡"category"` |
| :------ | :------ |
| id | Identificador unicod del producto (int) |
| name | Nombre del producto (varchar) |

`Nota:` La ruta del `API del backend` es: <a href="https://bs20-back.vercel.app/" target="_blank">https://bs20-back.vercel.app/</a>

`Nota:` Las `peticiones` son de tipo `GET`

<h1>GET - "productos"</h1>

```javascript
// routes/product.routes.js

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
```
`Nota:` Esta peticion GET accede a la tabla `product` de la Base de Datos

`Nota:` URL = https://bs20-back.vercel.app/

* Si la ruta de peticion es: `"URL/api/products"`, podrá visualizar todos los `productos`
* Si la ruta de peticion es: `"URL/api/products/2"`, podrá visualizar el producto con el campo `id` igual a `2`
* Si la ruta de peticion es: `"URL/api/products/cat/4"` podrá visualizar los productos con el campo `category` igual a `4`
* Si la ruta de peticion es: `"URL/api/products/search/ener"` podrá visualizar los productos con el campo `name` que contiene en su contenido la palabra `ener`


<h1>GET - "categorias"</h1>

```javascript
// routes/category.routes.js

module.exports = app => {
  const categories = require("../controllers/category.controller.js");

  var router = require("express").Router();

  // Create a new Category
  //router.post("/", categories.create);

  // Retrieve all Categories
  router.get("/", categories.findAll);

  // Retrieve a single Category with id
  router.get("/:id", categories.findOne);

  app.use('/api/categories', router);
};
```

`Nota:` Esta peticion GET accede a la tabla `category` de la Base de Datos

`Nota:` URL = https://bs20-back.vercel.app/

* Si la ruta de peticion es: `"URL/api/categories"`, podrá visualizar todas las `categorias`
* Si la ruta de peticion es: `"URL/api/categories/2"`, podrá visualizar la categoria con el campo `id` igual a `2`


## Peticiones de Productos
<h1>GET lista de "productos"</h1>

`Nota:` Retorna todos los `productos`

* **GET** /api/products desde el cliente (Frontend)
* Por medio de `AXIOS` se envia la solicitud GET, desde el cliente (Frontend)
* URL de peticion: https://bs20-back.vercel.app/api/products
* La API recibe la `peticion` tipo `GET` y la procesa

```javascript
// routes/product.routes.js

 ...
  // Retrieve all Products
  router.get("/", products.findAll);
  ...

  app.use('/api/products', router);
};
```

* La URL de peticion desde el cliente es: https://bs20-back.vercel.app/api/products
* Esto enruta hacia `findAll` en `controllers/product.controller.js`
* `findAll` direcciona a `getAll`

```javascript
// controllers/product.controller.js

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
```

* La API realiza la `consulta` de `peticion` a la Base de Datos
* Se ordena de modo que el campo `price` sea de forma ASCENDENTE
* Este pedido se encuentra en `models/product.model.js`

```javascript
// models/product.model.js

...
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
```

* La API obtiene como `respuesta` todos los `productos` si es que, la solicitud fue exitosa
* Caso contrario, se obtendra el `error 500` el cual, es error de conexion en el servidor
* De momento, se obtiene un total de 57 productos
* La API envia la `respuesta` al cliente (Frontend)

```json
[
   {
      "id": 53,
      "name": "Mani Sin Sal",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/manisinsalmp6988.jpg",
      "price": 500,
      "discount": 0,
      "category": 5
   },
   {
      "id": 55,
      "name": "Papas Fritas Bolsa Pequeña",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/papaslisas7271.jpg",
      "price": 500,
      "discount": 0,
      "category": 5
   },
   ...
   {
      "id": 33,
      "name": "RON PAMPERO ANIVERSARIO",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/ron_pampero_aniversario0311.jpg",
      "price": 20000,
      "discount": 15,
      "category": 3
   }
]
```

*  Finalmente, los `productos` son renderizados en el frontend


<p align="center"><img src="./img/Readme/todosproductos.png"/></p> 


## Peticiones de Categorias
<h1>GET lista de "categorias"</h1>

`Nota:` Retorna todas las `categorias`

* **GET** /api/categories desde el cliente (Frontend)
* Por medio de `AXIOS` se envia la solicitud GET, desde el cliente (Frontend)
* URL de peticion: https://bs20-back.vercel.app/api/categories
* La API recibe la `peticion` tipo `GET` y la procesa


```javascript
// routes/category.routes.js

 ...
  // Retrieve all Categories
  router.get("/", categories.findAll);
 ...

  app.use('/api/categories', router);
};
```

* La URL de peticion desde el cliente es: https://bs20-back.vercel.app/api/categories
* Esto enruta hacia `findAll` en `controllers/category.controller.js`
* `findAll` direcciona a `getAll`

```javascript
// controllers/category.controller.js

...
// Retrieve all Categories from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Category.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Categories."
      });
    else res.send(data);
  });
};
...
```

* La API realiza la `consulta` de `peticion` a la Base de Datos
* Se ordena de modo que el campo `price` sea de forma ASCENDENTE
* Este pedido se encuentra en `models/category.model.js`

```javascript
// models/category.model.js

...
Category.getAll = (title, result) => {
  let query = "SELECT * FROM category";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("categories: ", res);
    result(null, res);
  });
};

module.exports = Category;
```


* La API obtiene como `respuesta` todas los `categorias` si es que, la solicitud fue exitosa
* Caso contrario, se obtendra el `error 500` el cual, es error de conexion en el servidor
* De momento, se obtiene un total de 7 categorias
* La API envia la `respuesta` al cliente (Frontend)


```json
[
   {
      "id": 1,
      "name": "bebida energetica"
   },
   {
      "id": 2,
      "name": "pisco"
   },
   ...
   {
      "id": 7,
      "name": "vodka"
   }
]
```

*  Finalmente, las `categorias` son renderizadas en el `Sidebar` y en el `Select-option` del Navbar


`Nota:` Cada `producto` tiene un campo de `category` con un numero asignado entre 1 y 7.

`Nota:` Estos numeros estan relacionados con cada `categoria` obtenida.

`Nota:` Esto servirá para realizar el filtrado de los `productos` y ordenarlos por `categorias`

<p align="center"><img src="./img/Readme/sidebar-select.png"/></p> 


## Peticiones de Filtrado por Categoria
<h1 align="center">📌Filtro de productos desde el SideBar y desde el Select-option del Navbar</h1>

Ahora veamos acerca del filtrado de `productos` por medio de las `categorias`

Al dar click sobre una de las `categorias` ya sea del `SIDEBAR` o del `SELECT-OPTION`, se enviará `01 peticion` a la `API del backend` para solicitar los datos de los `productos` filtrados por la `categoria` seleccionada

<h1>GET lista de "productos" filtrado por "categorias"</h1>

`Nota:` Retornara los `productos` filtrados por la `categoria` seleccionada

* **GET** /api/products/cat/:cat
* Por medio de `AXIOS` se envia la solicitud GET, desde el cliente (Frontend)
* URL de peticion: `https://bs20-back.vercel.app/api/products/cat/:cat`
* La API recibe la peticion GET y la procesa

`Nota:` En la URL `https://bs20-back.vercel.app/api/products/cat/:cat` el valor de `:cat` debe ser reemplazado por el `id` de la `categoria` seleccionada

`Nota:` Por ejemplo, si selecciono `pisco` su `id` es `2` Entonces la URL será https://bs20-back.vercel.app/api/products/cat/2

`Nota:` Se obtendran los `productos` que tengan el campo `category: 2`

```javascript
// routes/product.routes.js

  ...
  // Retrieve a single Product with category
  router.get("/cat/:cat", products.findOneCat);
  ...
  app.use('/api/products', router);
};
```

* La URL de peticion desde el cliente es: `https://bs20-back.vercel.app/api/products/cat/:cat`
* Esto enruta hacia `findOneCat` en `controllers/product.controller.js`
* `findOneCat` direcciona a `findByCat`

```javascript
// controllers/product.controller.js
...
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
...
```

* La API realiza la consulta de peticion a la Base de Datos
* Se ordena de modo que el campo `price` sea de forma ASCENDENTE
* Este pedido se encuentra en `models/product.model.js`

```javascript
// models/product.controller.js
...
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
...
```

* La API obtiene como respuesta los `productos` filtrados por la `categoria` seleccionada; si es que, la solicitud fue exitosa
* Caso contrario, se obtendra el `error 500`; el cual, es error de conexion en el servidor
* La API envia la respuesta al cliente (Frontend)

`Nota:`
* Si se hubiese seleccionado `pisco` el `id` de la `categoria` seria `2`
* Para este caso particular, la respuesta de la API sería la siguiente:

```json
[
   {
      "id": 12,
      "name": "PISCO CAMPANARIO 35º",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/campanario8845.jpg",
      "price": 2990,
      "discount": 20,
      "category": 2
   },
   {
      "id": 10,
      "name": "PISCO ARTESANOS 35º ",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/artesanos8818.jpg",
      "price": 3990,
      "discount": 0,
      "category": 2
   },
   ...
   {
      "id": 91,
      "name": "PISCO MISTRAL NOBEL 40°",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/nobel409551.jpg",
      "price": 19990,
      "discount": 0,
      "category": 2
   }
]
```


`Nota:`
* Si se hubiese seleccionado `snack` el "id" de la `categoria` seria `5`
* Para este caso particular, la respuesta de la API sería la siguiente:

```json
[
   {
      "id": 53,
      "name": "Mani Sin Sal",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/manisinsalmp6988.jpg",
      "price": 500,
      "discount": 0,
      "category": 5
   },
   {
      "id": 55,
      "name": "Papas Fritas Bolsa Pequeña",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/papaslisas7271.jpg",
      "price": 500,
      "discount": 0,
      "category": 5
   },
   ...
   {
      "id": 56,
      "name": "Papas Fritas Tarro",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/78028005335657432.jpg",
      "price": 1990,
      "discount": 0,
      "category": 5
   }
]
```

*  Finalmente, los `productos` filtrados por la `categoria` seleccionada, son renderizados en el frontend


<p align="center"><img src="./img/Readme/piscoproductos.png"/></p>

<p align="center"><img src="./img/Readme/snackproductos.png"/></p>


## Peticiones de Filtrado por Nombre
<h1 align="center">📌Filtro de productos desde el "Buscador" del Navbar</h1>

Ahora veamos acerca del filtrado de `productos` por medio de los `nombres` de producto desde el `buscador` o `search bar` del Navbar

Al ingresar un `nombre` en el `buscador` o `search bar` del Navbar y dar click sobre el boton `search` o presionar `Enter`, se enviará `01 peticion` a la `API del backend` para solicitar los datos de los `productos` filtrados por el `nombre` ingresado

<h1>GET lista de "productos" filtrado por "nombre" desde el "buscador" o "search bar" del Navbar</h1>

`Nota:` Retornara los `productos` filtrados por `nombre` ingresado

* **GET** /api/products/search/:text
* Por medio de `AXIOS` se envia la solicitud GET, desde el cliente (Frontend)
* URL de peticion: `https://bs20-back.vercel.app/api/products/search/:text`

`Nota:` En la URL `https://bs20-back.vercel.app/api/products/search/:text` el valor de `:text` debe ser reemplazado por el `nombre` ingresado en el `buscador` o `search bar` del Navbar

`Nota:` Por ejemplo, si selecciono `ener` entonces `:text` es reemplazado por `ener`. Entonces la URL será https://bs20-back.vercel.app/api/products/search/ener

`Nota:` Se obtendran los `productos` que contengan la palabra `ener` en el campo `name` de cada producto

```javascript
// routes/product.routes.js

  ...
  // Retrieve a single Product with search bar
  router.get("/search/:text", products.findSearch);

  app.use('/api/products', router);
};
```

* La URL de peticion desde el cliente es: `https://bs20-back.vercel.app/api/products/search/:text`
* Esto enruta hacia `findSearch` en `controllers/product.controller.js`
* `findSearch` direcciona a `findBySearch`

```javascript
// controllers/product.controller.js

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
```

* La API realiza la consulta de peticion a la Base de Datos
* Se ordena de modo que el campo `price` sea de forma ASCENDENTE
* Este pedido se encuentra en `models/product.model.js`

```javascript
// models/product.model.js

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
```

* La API obtiene como respuesta los `productos` filtrados por la `categoria` seleccionada; si es que, la solicitud fue exitosa
* Caso contrario, se obtendra el `error 500`; el cual, es error de conexion en el servidor
* La API envia la respuesta al cliente (Frontend)

`Nota:`
* Si se hubiese ingreso en el `buscador` el nombre `ener` se hubiera buscado en el campo `name` los productos que contengan la palabra `ener`
* Para este caso particular, la respuesta de la API sería la siguiente:

```json
[
   {
      "id": 35,
      "name": "ENERGETICA MAKKA DRINKS",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/makka-drinks-250ml0455.jpg",
      "price": 1190,
      "discount": 0,
      "category": 1
   },
   {
      "id": 7,
      "name": "ENERGETICA SCORE",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/logo7698.png",
      "price": 1290,
      "discount": 0,
      "category": 1
   },
   ...
   {
      "id": 79,
      "name": "ENERGETICA MONSTER VERDE",
      "url_image": "",
      "price": 1990,
      "discount": 0,
      "category": 1
   }
]
```

*  Finalmente, los `productos` filtrados por el nombre `ener` ingresado, son renderizados en el frontend


<p align="center"><img src="./img/Readme/enerproductos.png"/></p>


## Errores
<h1 align="center">📌Errores</h1>

`1er Error:` Se da cuando el nombre ingresado por medio del `buscador` o `search bar` del Navbar, no coincide con algun nombre de un producto de la Base de datos

* **GET** /api/products/search/:text
* Por medio de `AXIOS` se envia la solicitud GET, desde el cliente (Frontend)
* URL de peticion: `https://bs20-back.vercel.app/api/products/search/:text`

`Nota:` En la URL `https://bs20-back.vercel.app/api/products/search/:text` el valor de `:text` debe ser reemplazado por el `nombre` ingresado en el `buscador` o `search bar` del Navbar

`Nota:` Por ejemplo, si selecciono `asdasd`, entonces `:text` es reemplazado por `asdasd`. Entonces la URL será https://bs20-back.vercel.app/api/products/search/asdasd

`Nota:` Se obtendran los `productos` que contengan la palabra `asdasd` en el campo `name` de cada producto

```javascript
// routes/product.routes.js

  ...
  // Retrieve a single Product with search bar
  router.get("/search/:text", products.findSearch);

  app.use('/api/products', router);
};
```

* La URL de peticion desde el cliente es: `https://bs20-back.vercel.app/api/products/search/:text`
* Esto enruta hacia `findSearch` en `controllers/product.controller.js`
* `findSearch` direcciona a `findBySearch`

```javascript
// controllers/product.controller.js

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
```

* Al continuar con la peticion a `findBySearch` del `models`, se sabrá que no existen coincidencias para el nombre `asdasd`
* Para este caso, el "controllers" devolverá en respuesta el Error 404 con el mensaje `"No hay coincidencias para: "asdasd".`

`Solucion:` Intentar con ingresar otro nombre

<p align="center"><img src="./img/Readme/error1.png"/></p>

`2do Error:` Se da cuando se interrumpe la conexion de internet o cuando no hay conexion con el servidor

* **GET** /api/products
* En este caso, para los diferentes tipos de PETICIONES predefinidos en la presente API
* Por medio de `AXIOS` se envia la solicitud GET, desde el cliente (Frontend)
* URL de peticion: `https://bs20-back.vercel.app/api/products/...`

```javascript
// routes/product.routes.js

  ...
  ...

  app.use('/api/products', router);
};
```

* La URL de peticion desde el cliente es: `https://bs20-back.vercel.app/api/products/...`
* Esto enruta hacia `findSearch` en `controllers/product.controller.js`

```javascript
// controllers/product.controller.js

    ...
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No hay coincidencias para: "${req.params.text}".`
        });
      } else {
        res.status(500).send({
          message: "Error de conexion. Intente de nuevo"
        });
      }
    } else res.send(data);
    ...
```

* En caso se pierda la conexion con la Base de Datos, la API responderá con el `Error 500` y con el mensaje `"Error de conexion. Intente de nuevo"`

`Solucion:` Recargar la pagina web o reiniciar la conexion a internet

	
### Guía de instalación
---
* El proyecto está basado en las tecnologias:
  * HTML, CSS, Javascript para el Frontend
  * Nodejs, Express para el Backend
  * Mysql para la Base de Datos
  * Boostrap 5 para los Estilos


* Para el Software de gestion de paquetes del Backend se está usando NPM
* Para la instalacion en LOCAL:
  * Clonar el repositorio
  * En la terminal ejecutar el comando `npm install`
  * Para levantar el servidor en local, ejecutar el comando  `nodemon index.js`


### Información adicional
---
### 🔭Skils:
Tecnologias utilizadas

| `🔭Frontend` | `⚡Backend` | `📫Database` |
| ------ | ------ | ------ | 
| CSS | Node js | Mysql |
| Bootstrap | Express |  |
| Javascript |  |  |


### 💻Pagina web: 📱
<ul>
<li> Frontend: <a href="https://bs20-front.netlify.app/" target="_blank">https://bs20-front.netlify.app/</a> </li>
<li> Backend: <a href="https://bs20-back.vercel.app/" target="_blank">https://bs20-back.vercel.app/</a> </li>
</ul>

