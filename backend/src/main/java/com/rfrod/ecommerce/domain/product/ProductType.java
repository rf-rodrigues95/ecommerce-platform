package com.rfrod.ecommerce.domain.product;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum ProductType {
    IMAC("imac"),
    PS5("ps5"),
    APPLE_WATCH("applewatch"),
    IPAD("ipad"),
    MACBOOK_PRO("macbookpro"),
    IPHONE("iphone");

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
