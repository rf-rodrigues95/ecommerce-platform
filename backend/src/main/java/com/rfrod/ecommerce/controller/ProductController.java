package com.rfrod.ecommerce.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rfrod.ecommerce.domain.product.Product;
import com.rfrod.ecommerce.domain.product.ProductRequestDTO;
import com.rfrod.ecommerce.domain.product.ProductResponseDTO;
import com.rfrod.ecommerce.service.ProductsService;

@RestController
@RequestMapping("product")
public class ProductController {

    @Autowired
    private ProductsService productsService;

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductRequestDTO requestDTO) {
        return ResponseEntity.ok(this.productsService.createProduct(requestDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable UUID id) {
        return ResponseEntity.ok(this.productsService.geProduct(id));
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getProducts() {
        return ResponseEntity.ok(this.productsService
            .getProducts().stream()
            .map(ProductResponseDTO::new).toList());
    }
}
