# Amazon-client

Live Deployment

[https://amazon-client.cmgrace.vercel.app/](https://amazon-client.cmgrace.vercel.app/)

## API Documentation

### Amazon Endpoints

    GET /api/products: Return an array of products stored in database.

```
{
      id: 1,
      title:
        "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback",
      price: "11.96",
      rating: 5,
      img_link:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
      date_published: "2021-01-29T17:19:49.000Z",
}
```

    GET /cart/items: Return an array of item in the cart.

```
{
      item_id: 1,
      product_id: 1,
      title:
        "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback",
      price: "11.96",
      rating: 5,
      img_link:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
    }
```

    POST /cart: post an item to the cart table

```
{ item_id: 1, product_id: 1 }
```

    POST /auth/login: post the user credentials for verification.

    DELETE /cart/items/:item_id: allow user to remove the item in the cart

## Technology used

### Frontend

- ReactJS
- React Router
- React Context
- HTML
- CSS
- Webpack
- Jest
- Deployed at Vercel

### Backend

- RESTful API
- Node & Express
- PostgresSQL
- Knex
- Supertest
- Mocha & Chai
- Deployed Heroku
