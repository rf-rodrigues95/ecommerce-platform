package com.rfrod.ecommerce.domain.cartItem;

import java.math.BigDecimal;
import java.util.UUID;

public record CartResponseDTO(UUID cartId,
        UUID cartItemId,
        UUID productId,
        String productName,
        BigDecimal productPrice,
        Integer quantity
    ) {
        public CartResponseDTO(CartItem cartItem){
        this(
            cartItem.getShoppingCart().getId(),
            cartItem.getId(),
            cartItem.getProduct().getId(),
            cartItem.getProduct().getName(),
            cartItem.getProduct().getPrice(),
            cartItem.getQuantity()
        );
    }
}
