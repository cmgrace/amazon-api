CREATE TABLE amazon_users (
    user_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    user_address TEXT,
    card_info TEXT,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE amazon_basket
  ADD COLUMN
    user_id INTEGER REFERENCES amazon_users(user_id)
    ON DELETE SET NULL;