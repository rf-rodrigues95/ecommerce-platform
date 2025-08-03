CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE shopping_carts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    active BOOLEAN NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);