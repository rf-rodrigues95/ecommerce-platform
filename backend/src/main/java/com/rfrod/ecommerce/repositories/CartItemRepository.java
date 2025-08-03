package com.rfrod.ecommerce.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rfrod.ecommerce.domain.cartItem.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, UUID>{

}
