CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE cart_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cart_id UUID,
    product_id UUID,
    quantity INTEGER,
    FOREIGN KEY(cart_id) REFERENCES shopping_carts(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);