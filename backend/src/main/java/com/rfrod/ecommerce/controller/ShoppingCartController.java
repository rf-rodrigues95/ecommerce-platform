package com.rfrod.ecommerce.controller;

import static com.rfrod.ecommerce.utils.Result.errorOrValue;
import static com.rfrod.ecommerce.utils.Result.toResponseEntity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rfrod.ecommerce.domain.cartItem.CartRequestDTO;
import com.rfrod.ecommerce.domain.cartItem.CartResponseDTO;
import com.rfrod.ecommerce.domain.user.User;
import com.rfrod.ecommerce.service.ShoppingCartService;
@RestController
@RequestMapping("cart")
public class ShoppingCartController {

    @Autowired  
    private ShoppingCartService cartService;

    public ShoppingCartController(ShoppingCartService cartService) {
        this.cartService = cartService;
    }
    
    @PostMapping("/items")
    public ResponseEntity<CartResponseDTO> addToCart(@RequestBody CartRequestDTO request, @AuthenticationPrincipal User user) {
        var res = this.cartService.addCartItem(user.getId(), request.productId(), request.quantity());
        return toResponseEntity(errorOrValue(res, CartResponseDTO::new));
    }

    @GetMapping("/items")
    public ResponseEntity<List<CartResponseDTO>> getItems(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(this.cartService.getCartItems(user.getId())
            .stream()
            .map(CartResponseDTO::new).toList());
    }
}
