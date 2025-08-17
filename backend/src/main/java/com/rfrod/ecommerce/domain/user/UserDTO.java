package com.rfrod.ecommerce.domain.user;

import java.util.UUID;

public record UserDTO(
    UUID id,
    String username,
    String role
) {}