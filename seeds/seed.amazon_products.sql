BEGIN;

TRUNCATE
  amazon_products,
  amazon_basket,
  RESTART IDENTITY CASCADE;

INSERT INTO amazon_products (title, price, rating, img_link)
VALUES
('The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback', 
11.96, 5, 
'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg'),

('Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl', 
239.0, 4, 
'https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg'),

('Samsung LC49RG90SSUXEN 49-inch Curved LED Gaming Monitor', 
199.99, 3, 
'https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg'),

('Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric', 
98.99, 5, 
'https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$'),

('New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)', 
598.99, 4, 
'https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg'),

('Samsung LC49RG90SSUXEN 49-inch Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440', 
1094.98, 4, 
'https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg');

COMMIT;