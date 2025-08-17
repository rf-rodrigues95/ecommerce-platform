package com.rfrod.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rfrod.ecommerce.domain.security.TokenService;
import com.rfrod.ecommerce.domain.user.AuthenticationDTO;
import com.rfrod.ecommerce.domain.user.LoginResponseDTO;
import com.rfrod.ecommerce.domain.user.RegisterDTO;
import com.rfrod.ecommerce.domain.user.User;
import com.rfrod.ecommerce.domain.user.UserDTO;
import com.rfrod.ecommerce.repositories.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService;
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO data) {
        var usernamePw = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePw);
        User user = (User) auth.getPrincipal();
        var token = tokenService.generateToken(user);

        return ResponseEntity.ok(new LoginResponseDTO(token ,
            new UserDTO(user.getId(), user.getLogin(), user.getRole().getRole())));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterDTO data) {
        if( this.repository.findByLogin(data.login()) != null)
            return ResponseEntity.badRequest().build();

        String encryptedPw = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.login(), encryptedPw, data.role());
        this.repository.save(newUser);
                
        return ResponseEntity.ok().build();
    }
}
