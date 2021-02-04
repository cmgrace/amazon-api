const knex = require("knex");
const AmazonService = require("../src/amazon/amazon-service");
const helpers = require("./test-helpers");
const app = require("../src/app");
const supertest = require("supertest");
const { expect } = require("chai");

describe("Amazon service object", () => {
  let db;

  // We'll use this array as an example of mock data that represents

  const { testProducts, testItemInBasket } = helpers.makeAmazonFixtures();
  const testItem = [{ item_id: 1, product_id: 1 }];
  const expectItem = [
    {
      item_id: 1,
      product_id: 1,
      title:
        "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback",
      price: "11.96",
      rating: 5,
      img_link:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
    },
  ];

  // Prepare the database connection using the `db` variable available

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe("GET /api/products", () => {
    context("Given no products", () => {
      it("responds with 200 and an empty list", () => {
        return supertest(app).get("/api/products").expect(200, []);
      });
    });

    context("Given there are products in the database", () => {
      beforeEach("insert products", () => {
        return db.into("amazon_products").insert(testProducts);
      });
      it("responds with 200 and all of the products", () => {
        return supertest(app).get("/api/products").expect(200, testProducts);
      });
    });
  });

  describe("GET /api/cart/items", () => {
    context("Given no items in cart", () => {
      it("responds with 200 and an empty list", () => {
        return supertest(app).get("/api/cart/items").expect(200, []);
      });
    });

    context("Given there are items in the cart", () => {
      beforeEach("insert item in cart", () => {
        return db
          .into("amazon_products")
          .insert(testProducts)
          .then(() => {
            return db.into("amazon_basket").insert(testItem);
          });
      });
      it("responds with 200 and all of the products", () => {
        return supertest(app).get("/api/cart/items").expect(200, expectItem);
      });
    });
  });

  describe("POST /api/cart", () => {
    //should seed product_id=1 in amazon_products
    context("add items to basket", () => {
      beforeEach("insert item in cart", () => {
        return db.into("amazon_products").insert(testProducts);
      });
      it("add one item in basket and returns item_id and product info", () => {
        const newItem = {
          product_id: 1,
        };
        return supertest(app).post("/api/cart").send(newItem).expect(201);
        //   .then((res) =>
        //     supertest(app).get(`/api/cart/items`).expect(expectItem)
        //   );
      });
    });
  });

  describe("DELETE /api/cart/items/:item_id", () => {
    context("Given there are items in the database", () => {
      beforeEach("insert item in cart", () => {
        return db
          .into("amazon_products")
          .insert(testProducts)
          .then(() => {
            return db.into("amazon_basket").insert(testItem);
          });
      });

      it("responds with 204 and removes the article", () => {
        // const idToRemove = 1;
        // const expectedBasket = testItemInBasket.filter(
        //   (item) => item.item_id !== idToRemove
        // );
        // return supertest(app).delete(`/api/cart/${idToRemove}`).expect(200);
        //   .then((res) =>
        //     supertest(app).get(`/cart/items`).expect(expectedBasket)
        //   );
      });
    });
  });
});
