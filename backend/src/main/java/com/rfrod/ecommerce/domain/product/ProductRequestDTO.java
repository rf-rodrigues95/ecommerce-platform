package com.rfrod.ecommerce.domain.product;

import java.math.BigDecimal;

public record ProductRequestDTO(String name, String description, BigDecimal price, Integer stock, ProductType type) {
    
}
