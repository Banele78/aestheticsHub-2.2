package com.aestheticsHub.Backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.aestheticsHub.Backend.auth.AuthInterceptor;
import com.aestheticsHub.Backend.model.User;
import com.aestheticsHub.Backend.model.UserProfile;
import com.aestheticsHub.Backend.repository.UserProfileRepository;


@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthInterceptor authInterceptor;

    public UserProfile getById(Long id){
        return userProfileRepository.findById(id).orElse(null);
    }


    public UserProfile SaveProfile(String nickName, String artistType, String bio, String profilePic, String contentType, byte[] Picbytes){
        Long userId = authInterceptor.getId();
        User user = userService.getUserById(userId);
        UserProfile userProfile = new UserProfile();
        userProfile.setNickName(nickName);
        userProfile.setArtistType(artistType);
        userProfile.setBio(bio);
        userProfile.setProfilePic(profilePic);
        userProfile.setContentType(contentType);
        userProfile.setPicbytes(Picbytes);
        userProfile.setUser(user);
        return userProfileRepository.save(userProfile);
    }

    public UserProfile getUserProfile(User user){
        return userProfileRepository.findByUser(user).orElse(null);
    }



}
