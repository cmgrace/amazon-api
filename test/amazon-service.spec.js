const knex = require("knex");
const AmazonService = require("../src/amazon/amazon-service");

describe("Amazon service object", () => {
  let db;

  // We'll use this array as an example of mock data that represents
  // valid content for our database
  const testProducts = [
    {
      id: 1,
      title:
        "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback",
      price: "11.96",
      rating: 5,
      img_link:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
      date_published: new Date("2021-01-29 17:19:49"),
    },
    {
      id: 2,
      title:
        "Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl",
      price: "239.00",
      rating: 4,
      img_link:
        "https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg",
      date_published: new Date("2021-01-29 17:19:49"),
    },
    {
      id: 3,
      title: "Samsung LC49RG90SSUXEN 49-inch Curved LED Gaming Monitor",
      price: "199.99",
      rating: 3,
      img_link:
        "https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg",
      date_published: new Date("2021-01-29 17:19:49"),
    },
    {
      id: 4,
      title:
        "Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric",
      price: "98.99",
      rating: 5,
      img_link:
        "https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$",
      date_published: new Date("2021-01-29 17:19:49"),
    },
    {
      id: 5,
      title:
        "New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)",
      price: "598.99",
      rating: 4,
      img_link:
        "https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg",
      date_published: new Date("2021-01-29 17:19:49"),
    },
    {
      id: 6,
      title:
        "Samsung LC49RG90SSUXEN 49-inch Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440",
      price: "1094.98",
      rating: 4,
      img_link:
        "https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg",
      date_published: new Date("2021-01-29 17:19:49"),
    },
  ];

  // Prepare the database connection using the `db` variable available
  // in the scope of the primary `describe` block. This means `db`
  // will be available in all of our tests.
  before("setup db", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
  });

  // Before all tests run and after each individual test, empty the
  // blogful_articles table
  before("clean db", () => db("amazon_products").truncate());
  afterEach("clean db", () => db("amazon_products").truncate());

  // After all tests run, let go of the db connection
  after("destroy db connection", () => db.destroy());

  describe("getAllProducts()", () => {
    it("returns an empty array", () => {
      return AmazonService.getAllProducts(db).then((products) =>
        expect(products).to.eql([])
      );
    });

    // Whenever we set a context with data present, we should always include
    // a beforeEach() hook within the context that takes care of adding the
    // appropriate data to our table
    context("with data present", () => {
      beforeEach("insert test articles", () =>
        db("amazon_products").insert(testProducts)
      );

      it("returns all test products", () => {
        return AmazonService.getAllProducts(db).then((products) =>
          expect(products).to.eql(testProducts)
        );
      });
    });
  });

  describe("insertItemToBasket()", () => {
    afterEach("clean db", () => db("amazon_basket").truncate());
    it("inserts item in db and returns item_id and product_id", () => {
      // New article to use as subject of our test
      const newItem = {
        product_id: "1",
      };

      return AmazonService.insertItemToBasket(db, newItem).then((actual) => {
        expect(actual).to.eql({
          item_id: "1",
          product_id: "1",
        });
      });
    });
  });

  //   describe('getById()', () => {
  //     it('should return undefined', () => {
  //       return ArticlesService
  //         .getById(db, 999)
  //         .then(article => expect(article).to.be.undefined);
  //     });

  //     context('with data present', () => {
  //       before('insert articles', () =>
  //         db('blogful_articles')
  //           .insert(testArticles)
  //       );

  //       it('should return existing article', () => {
  //         const expectedArticleId = 3;
  //         const expectedArticle = testArticles.find(a => a.id === expectedArticleId);
  //         return ArticlesService.getById(db, expectedArticleId)
  //           .then(actual => expect(actual).to.eql(expectedArticle));
  //       });
  //     });
  //   });

  //   describe('deleteArticle()', () => {
  //     it('should return 0 rows affected', () => {
  //       return ArticlesService
  //         .deleteArticle(db, 999)
  //         .then(rowsAffected => expect(rowsAffected).to.eq(0));
  //     });

  //     context('with data present', () => {
  //       before('insert articles', () =>
  //         db('blogful_articles')
  //           .insert(testArticles)
  //       );

  //       it('should return 1 row affected and record is removed from db', () => {
  //         const deletedArticleId = 1;

  //         return ArticlesService
  //           .deleteArticle(db, deletedArticleId)
  //           .then(rowsAffected => {
  //             expect(rowsAffected).to.eq(1);
  //             return db('blogful_articles').select('*');
  //           })
  //           .then(actual => {
  //             // copy testArticles array with id 1 filtered out
  //             const expected = testArticles.filter(a => a.id !== deletedArticleId);
  //             expect(actual).to.eql(expected);
  //           });
  //       });
  //     });
  //   });

  //   describe('updateArticle()', () => {
  //     it('should return 0 rows affected', () => {
  //       return ArticlesService
  //         .updateArticle(db, 999, { title: 'new title!' })
  //         .then(rowsAffected => expect(rowsAffected).to.eq(0));
  //     });

  //     context('with data present', () => {
  //       before('insert articles', () =>
  //         db('blogful_articles')
  //           .insert(testArticles)
  //       );

  //       it('should successfully update an article', () => {
  //         const updatedArticleId = 1;
  //         const testArticle = testArticles.find(a => a.id === updatedArticleId);
  //         // make copy of testArticle in db, overwriting with newly updated field value
  //         const updatedArticle = { ...testArticle, title: 'New title!' };

  //         return ArticlesService
  //           .updateArticle(db, updatedArticleId, updatedArticle)
  //           .then(rowsAffected => {
  //             expect(rowsAffected).to.eq(1)
  //             return db('blogful_articles').select('*').where({ id: updatedArticleId }).first();
  //           })
  //           .then(article => {
  //             expect(article).to.eql(updatedArticle);
  //           });
  //       });
  //     });
  //   });
});
