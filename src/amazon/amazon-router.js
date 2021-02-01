const express = require("express");
const AmazonService = require("./amazon-service");
const jsonParser = express.json();

const amazonRouter = express.Router();

amazonRouter.route("/products").get((req, res, next) => {
  AmazonService.getAllProducts(req.app.get("db"))
    .then((products) => {
      res.json(products);
    })
    .catch(next);
});

amazonRouter.route("/cart").post(jsonParser, (req, res, next) => {
  const { product_id } = req.body;
  const newItemAdded = { product_id };
  AmazonService.insertItemToBasket(req.app.get("db"), newItemAdded)
    .then((productAdded) => res.status(201).json(productAdded))
    .catch(next);
});

amazonRouter.route("/cart/items").get((req, res, next) => {
  AmazonService.getAllProductsInBasket(req.app.get("db"))
    .then((products) => res.json(products))
    .catch(next);
});

amazonRouter.route("/cart/items/:item_id").delete((req, res, next) => {
  AmazonService.deleteItem(req.app.get("db"), req.params.item_id)
    .then((items) => res.json(items))
    .catch(next);
});

amazonRouter.route("/order/history").post(jsonParser, (req, res, next) => {
  const { user_id, product_id } = req.body;
  const newOrder = { user_id, product_id };
  AmazonService.insertOrderToHistory(req.app.get("db"), newOrder)
    .then((order) => res.json(order))
    .catch(next);
});

module.exports = amazonRouter;
