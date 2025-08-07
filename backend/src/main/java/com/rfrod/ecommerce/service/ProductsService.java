package com.rfrod.ecommerce.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rfrod.ecommerce.domain.product.Product;
import com.rfrod.ecommerce.domain.product.ProductRequestDTO;
import com.rfrod.ecommerce.repositories.ProductRepository;
import com.rfrod.ecommerce.utils.Result;

import static com.rfrod.ecommerce.utils.Result.error;
import static com.rfrod.ecommerce.utils.Result.ErrorCode.BAD_REQUEST;
import static com.rfrod.ecommerce.utils.Result.ErrorCode.CONFLICT;
import static com.rfrod.ecommerce.utils.Result.ErrorCode.INTERNAL_ERROR;
import static com.rfrod.ecommerce.utils.Result.ErrorCode.NOT_FOUND;

@Service
public class ProductsService {

    @Autowired
    private ProductRepository repository;

    public Result<Product> createProduct(ProductRequestDTO data) {
        if (!isValid(data))
            return error(BAD_REQUEST);

        if(repository.findByName(data.name()).isPresent())
            return error(CONFLICT);

        try {
            Product product = buildProduct(data);
            repository.save(product);
            return Result.ok(product);
        } catch (Exception e) {
            return error(INTERNAL_ERROR);
        }
    }

    public Result<Product> geProduct(UUID id) {
        if (id == null)
            return error(BAD_REQUEST);

        return repository.findById(id).map(Result::ok).orElse(error(NOT_FOUND));
    }

    public Result<Void> updateProduct(UUID id, ProductRequestDTO data) {
        if (id == null || !isValid(data))
            return error(BAD_REQUEST);

        try {
            return repository.findById(id)
            .map(existing -> {
                updateEntity(existing, data);
                repository.save(existing);
                return Result.<Void>ok();
            }).orElse(error(NOT_FOUND));
        } catch (Exception e) {
            return error(INTERNAL_ERROR);
        }
    }

    public Result<Void> deleteProduct(UUID id) {
        if (id == null)
            return error(BAD_REQUEST);
        
        if(!repository.existsById(id))
            return error(NOT_FOUND);
        
        try {
            repository.deleteById(id);
            return Result.ok();
        } catch (Exception e) {
            return error(INTERNAL_ERROR);
        }
    }    

    public List<Product> getProducts() {
        return repository.findAll();
    }

    // Helper methods
    private boolean isValid(ProductRequestDTO data) {
        return data != null && data.name() != null && !data.name().isBlank();
    }

    private Product buildProduct(ProductRequestDTO data) {
        Product product = new Product();
        updateEntity(product, data);
        return product;
    }

    private void updateEntity(Product product, ProductRequestDTO data) {
        product.setName(data.name());
        product.setPrice(data.price());
        product.setStock(data.stock());
    }
}
