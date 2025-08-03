package com.rfrod.ecommerce.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class Products {

    @GetMapping
    public String getProducts() {
        // Gets the list of products in DB
        // Return errors:
        // - 404 if no products found
        // - 500 if there is an error in the DB
        // prepare for filter / search parameters
        return "List of products";
    }
}
