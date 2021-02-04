const knex = require("knex");
const App = require("../src/app");
const helpers = require("./test-helpers");

function makeProductsArray() {
  return [
    {
      id: 1,
      title:
        "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback",
      price: "11.96",
      rating: 5,
      img_link:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
      date_published: "2021-01-29T17:19:49.000Z",
    },
    {
      id: 2,
      title:
        "Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl",
      price: "239.00",
      rating: 4,
      img_link:
        "https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg",
      date_published: "2021-01-29T17:19:49.000Z",
    },
    {
      id: 3,
      title: "Samsung LC49RG90SSUXEN 49-inch Curved LED Gaming Monitor",
      price: "199.99",
      rating: 3,
      img_link:
        "https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg",
      date_published: "2021-01-29T17:19:49.000Z",
    },
    {
      id: 4,
      title:
        "Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric",
      price: "98.99",
      rating: 5,
      img_link:
        "https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$",
      date_published: "2021-01-29T17:19:49.000Z",
    },
    {
      id: 5,
      title:
        "New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)",
      price: "598.99",
      rating: 4,
      img_link:
        "https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg",
      date_published: "2021-01-29T17:19:49.000Z",
    },
    {
      id: 6,
      title:
        "Samsung LC49RG90SSUXEN 49-inch Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440",
      price: "1094.98",
      rating: 4,
      img_link:
        "https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg",
      date_published: "2021-01-29T17:19:49.000Z",
    },
  ];
}

function makeItemsInBasketArray(product) {
  return [
    {
      item_id: 1,
      product_id: product[0].id,
    },
    {
      item_id: 2,
      product_id: product[1].id,
    },
    {
      item_id: 3,
      product_id: product[2].id,
    },
  ];
}

function makeCommentsArray(users, articles) {
  return [
    {
      id: 1,
      text: "First test comment!",
      article_id: articles[0].id,
      user_id: users[0].id,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 2,
      text: "Second test comment!",
      article_id: articles[0].id,
      user_id: users[1].id,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 3,
      text: "Third test comment!",
      article_id: articles[0].id,
      user_id: users[2].id,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 4,
      text: "Fourth test comment!",
      article_id: articles[0].id,
      user_id: users[3].id,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 5,
      text: "Fifth test comment!",
      article_id: articles[articles.length - 1].id,
      user_id: users[0].id,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 6,
      text: "Sixth test comment!",
      article_id: articles[articles.length - 1].id,
      user_id: users[2].id,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 7,
      text: "Seventh test comment!",
      article_id: articles[3].id,
      user_id: users[0].id,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
  ];
}

function makeExpectedArticle(users, article, comments = []) {
  const author = users.find((user) => user.id === article.author_id);

  const number_of_comments = comments.filter(
    (comment) => comment.article_id === article.id
  ).length;

  return {
    id: article.id,
    style: article.style,
    title: article.title,
    content: article.content,
    date_created: article.date_created.toISOString(),
    number_of_comments,
    author: {
      id: author.id,
      user_name: author.user_name,
      full_name: author.full_name,
      nickname: author.nickname,
      date_created: author.date_created.toISOString(),
      date_modified: author.date_modified || null,
    },
  };
}

function makeExpectedArticleComments(users, articleId, comments) {
  const expectedComments = comments.filter(
    (comment) => comment.article_id === articleId
  );

  return expectedComments.map((comment) => {
    const commentUser = users.find((user) => user.id === comment.user_id);
    return {
      id: comment.id,
      text: comment.text,
      date_created: comment.date_created.toISOString(),
      user: {
        id: commentUser.id,
        user_name: commentUser.user_name,
        full_name: commentUser.full_name,
        nickname: commentUser.nickname,
        date_created: commentUser.date_created.toISOString(),
        date_modified: commentUser.date_modified || null,
      },
    };
  });
}

function makeMaliciousArticle(user) {
  const maliciousArticle = {
    id: 911,
    style: "How-to",
    date_created: new Date(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    author_id: user.id,
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  };
  const expectedArticle = {
    ...makeExpectedArticle([user], maliciousArticle),
    title:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  };
  return {
    maliciousArticle,
    expectedArticle,
  };
}

function makeAmazonFixtures() {
  const testProducts = makeProductsArray();
  const testItemInBasket = makeItemsInBasketArray(testProducts);

  return { testProducts, testItemInBasket };
}

function cleanTables(db) {
  return db.transaction(
    (trx) =>
      trx.raw(
        `TRUNCATE
        amazon_basket,
        amazon_products
        
      `
      )
    // .then(() =>
    //   Promise.all([
    //     trx.raw(`ALTER SEQUENCE blogful_articles_id_seq minvalue 0 START WITH 1`),
    //     trx.raw(`ALTER SEQUENCE blogful_users_id_seq minvalue 0 START WITH 1`),
    //     trx.raw(`ALTER SEQUENCE blogful_comments_id_seq minvalue 0 START WITH 1`),
    //     trx.raw(`SELECT setval('blogful_articles_id_seq', 0)`),
    //     trx.raw(`SELECT setval('blogful_users_id_seq', 0)`),
    //     trx.raw(`SELECT setval('blogful_comments_id_seq', 0)`),
    //   ])
    // )
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db
    .into("blogful_users")
    .insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(`SELECT setval('blogful_users_id_seq', ?)`, [
        users[users.length - 1].id,
      ])
    );
}

function seedArticlesTables(db, users, articles, comments = []) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async (trx) => {
    await seedUsers(trx, users);
    await trx.into("blogful_articles").insert(articles);
    // update the auto sequence to match the forced id values
    await trx.raw(`SELECT setval('blogful_articles_id_seq', ?)`, [
      articles[articles.length - 1].id,
    ]);
    // only insert comments if there are some, also update the sequence counter
    if (comments.length) {
      await trx.into("blogful_comments").insert(comments);
      await trx.raw(`SELECT setval('blogful_comments_id_seq', ?)`, [
        comments[comments.length - 1].id,
      ]);
    }
  });
}

function seedMaliciousArticle(db, user, article) {
  return seedUsers(db, [user]).then(() =>
    db.into("blogful_articles").insert([article])
  );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeProductsArray,
  makeAmazonFixtures,
  makeItemsInBasketArray,
  makeExpectedArticle,
  makeExpectedArticleComments,
  makeMaliciousArticle,
  makeCommentsArray,

  cleanTables,
  seedArticlesTables,
  seedMaliciousArticle,
  makeAuthHeader,
  seedUsers,
};
