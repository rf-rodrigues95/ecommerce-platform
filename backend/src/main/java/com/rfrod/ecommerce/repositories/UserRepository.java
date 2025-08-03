package com.rfrod.ecommerce.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rfrod.ecommerce.domain.user.User;

public interface UserRepository extends JpaRepository<User, UUID>{

}
