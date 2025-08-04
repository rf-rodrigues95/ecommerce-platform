package com.rfrod.ecommerce.domain.product;

import java.math.BigDecimal;

public record ProductRequestDTO(String name, BigDecimal price, Integer stock) {
    
}
