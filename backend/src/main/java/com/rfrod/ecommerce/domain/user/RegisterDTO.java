package com.rfrod.ecommerce.domain.user;

public record RegisterDTO(String login, String password, UserRole role) {

}
