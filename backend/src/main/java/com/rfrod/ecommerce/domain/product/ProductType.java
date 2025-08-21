package com.rfrod.ecommerce.domain.product;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum ProductType {
    IMAC("Apple iMac"),
    PS5("Playstation 5"),
    APPLE_WATCH("Apple Watch"),
    IPAD("Apple iPad"),
    MACBOOK_PRO("Apple - Mac Book Pro"),
    IPHONE("Apple iPhone");

    private String type;

    ProductType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return type;
    }

    @JsonCreator
    public static ProductType fromValue(String value) {
        for (ProductType pt : values()) {
            if (pt.type.equalsIgnoreCase(value)) return pt;
        }
        throw new IllegalArgumentException("Unknown ProductType: " + value);
    }
}
