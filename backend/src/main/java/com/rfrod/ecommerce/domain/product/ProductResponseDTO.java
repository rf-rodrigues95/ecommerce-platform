package com.rfrod.ecommerce.domain.product;

import java.math.BigDecimal;
import java.util.UUID;

public record ProductResponseDTO(UUID id, String name, BigDecimal price, Integer stock, String description, String type, String typeDescription) {
    public ProductResponseDTO(Product product){
        this(product.getId(), product.getName(), product.getPrice(), product.getStock(), product.getDescription(), product.getProductType().name(), product.getProductType().getDescription());
    }
}
