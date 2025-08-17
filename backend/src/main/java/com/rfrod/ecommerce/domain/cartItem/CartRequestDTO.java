package com.rfrod.ecommerce.domain.cartItem;

import java.util.UUID;

public record CartRequestDTO(UUID productId, Integer quantity) {

}

