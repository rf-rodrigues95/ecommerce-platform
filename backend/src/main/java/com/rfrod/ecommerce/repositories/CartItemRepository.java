package com.rfrod.ecommerce.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rfrod.ecommerce.domain.cartItem.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, UUID>{
    Optional<CartItem> findByShoppingCartIdAndProductId(UUID cartId, UUID productId);
    List<CartItem> findByShoppingCartId(UUID cartId);
}
