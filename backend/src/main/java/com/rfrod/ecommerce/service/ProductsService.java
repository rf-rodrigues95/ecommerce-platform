package com.rfrod.ecommerce.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

import com.rfrod.ecommerce.domain.product.Product;
import com.rfrod.ecommerce.domain.product.ProductRequestDTO;
import com.rfrod.ecommerce.exceptions.BadRequestException;
import com.rfrod.ecommerce.exceptions.ConflictException;
import com.rfrod.ecommerce.exceptions.ResourceNotFoundException;
import com.rfrod.ecommerce.repositories.ProductRepository;

public class ProductsService {

    @Autowired
    private ProductRepository repository;

    public Product createProduct(ProductRequestDTO data) {
        try {
            if (data.name() == null || data.name().isBlank())
                throw new BadRequestException("Product needs a name");

            if(repository.findByName(data.name()) != null)
                throw new ConflictException("This product name already exists");

            Product p = new Product();
            p.setName(data.name());
            p.setPrice(data.price());
            p.setStock(data.stock());

            repository.save(p);

            return p;
        } catch (Exception e) {
            throw new RuntimeException("Internal server error during product creation");
        }
    }

    public Product geProduct(UUID id) {
        if (id == null)
            throw new BadRequestException("Id can't be null");

        return repository.findById(id)
            .orElseThrow( () -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public List<Product> getProducts() {
        return repository.findAll();
    }
}
