// src/main/java/com/rfrod/ecommerce/exceptions/ResourceNotFoundException.java
package com.rfrod.ecommerce.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
