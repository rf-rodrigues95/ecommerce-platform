package com.rfrod.ecommerce.controller;

import static com.rfrod.ecommerce.utils.Result.errorOrValue;
import static com.rfrod.ecommerce.utils.Result.toResponseEntity;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rfrod.ecommerce.domain.product.ProductRequestDTO;
import com.rfrod.ecommerce.domain.product.ProductResponseDTO;
import com.rfrod.ecommerce.service.ProductsService;

@RestController
@RequestMapping("product")
public class ProductController {

    @Autowired
    private ProductsService productsService;

    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(@RequestBody ProductRequestDTO requestDTO) {
        var res = this.productsService.createProduct(requestDTO);
        return toResponseEntity(errorOrValue(res, ProductResponseDTO::new));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateProduct(@PathVariable UUID id, @RequestBody ProductRequestDTO requestDTO) {
        return toResponseEntity(this.productsService.updateProduct(id, requestDTO));
    }

    @DeleteMapping("/{id}") 
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id){
        return toResponseEntity(this.productsService.deleteProduct(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProduct(@PathVariable UUID id) {
        var res = this.productsService.geProduct(id);
        return toResponseEntity(errorOrValue(res, ProductResponseDTO::new));
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getProducts() {
        return ResponseEntity.ok(this.productsService
            .getProducts().stream().map(ProductResponseDTO::new).toList());
    }

}
