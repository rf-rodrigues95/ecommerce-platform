package com.rfrod.ecommerce.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rfrod.ecommerce.domain.product.Product;

public interface ProductRepository extends JpaRepository<Product, UUID>{
    Optional<Product> findByName(String name);
}
