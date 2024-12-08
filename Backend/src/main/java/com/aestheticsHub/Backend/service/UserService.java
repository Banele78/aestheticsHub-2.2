package com.aestheticsHub.Backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aestheticsHub.Backend.model.User;
import com.aestheticsHub.Backend.repository.UserRepository;
import com.aestheticsHub.Backend.utility.PasswordUtil;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    

    public User getUserById(Long id){
        return userRepository.findById(id).orElse(null);
    } 

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
    

    public User saveUser(User user){
         // Hash the password before saving
         user.setPassword(PasswordUtil.hashPassword(user.getPassword()));
        return userRepository.save(user);
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

}
