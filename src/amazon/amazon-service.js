const AmazonService = {
  getAllProducts(knex) {
    return knex.select("*").from("amazon_products");
  },
  insertItemToBasket(knex, newItemAdded) {
    return knex.insert(newItemAdded).into("amazon_basket").returning("*");
    //   .then((rows) => rows[0]);
  },
  getAllProductsInBasket(knex) {
    return knex
      .select("item_id", "product_id", "title", "price", "rating", "img_link")
      .from("amazon_basket")
      .join(
        "amazon_products",
        "amazon_basket.product_id",
        "=",
        "amazon_products.id"
      );
  },
  deleteItem(knex, item_id) {
    return knex("amazon_basket")
      .select("item_id", "product_id")
      .from("amazon_basket")
      .returning("*")
      .where({ item_id })
      .delete();
  },

  insertOrderToHistory(knex, newOrder) {
    return knex.insert(newOrder).into("amazon_orders").returning("*");
    // .select("date_created", "product_id").from('amzon_orders')
  },
};
module.exports = AmazonService;
