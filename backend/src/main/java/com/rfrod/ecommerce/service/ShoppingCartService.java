package com.rfrod.ecommerce.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rfrod.ecommerce.domain.cartItem.CartItem;
import com.rfrod.ecommerce.domain.shoppingCart.ShoppingCart;
import com.rfrod.ecommerce.repositories.CartItemRepository;
import com.rfrod.ecommerce.repositories.ProductRepository;
import com.rfrod.ecommerce.repositories.ShoppingCartRepository;
import com.rfrod.ecommerce.repositories.UserRepository;
import com.rfrod.ecommerce.utils.Result;

@Service
public class ShoppingCartService {
    private final ShoppingCartRepository cartRepository;
    private final CartItemRepository itemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ShoppingCartService(
        ShoppingCartRepository cartRepository,
        CartItemRepository itemRepository,
        ProductRepository productRepository,
        UserRepository userRepository
    ) {
        this.cartRepository = cartRepository;
        this.itemRepository = itemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }
    
    @Transactional
    public Result<CartItem> addCartItem(UUID userId, UUID productId, int quantity) {
        var user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        var cart = cartRepository.findByUserIdAndActiveTrue(userId)
            .orElseGet(() -> {
                var newCart = new ShoppingCart();
                newCart.setUser(user);
                newCart.setActive(true);
                return cartRepository.save(newCart);
            });

        var product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        var cartItem = itemRepository.findByShoppingCartIdAndProductId(cart.getId(), productId)
        .orElse(new CartItem());

        cartItem.setShoppingCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity( (cartItem.getQuantity() != null )
                ? cartItem.getQuantity() + quantity
                : quantity);

        return Result.ok(itemRepository.save(cartItem));
    }

    public List<CartItem> getCartItems(UUID userId) {
        if (userId == null)
            throw new RuntimeException("User not found");

        return cartRepository.findByUserIdAndActiveTrue(userId)
            .map(cart -> itemRepository.findByShoppingCartId(cart.getId()))
            .orElse(List.of());
    }
}
