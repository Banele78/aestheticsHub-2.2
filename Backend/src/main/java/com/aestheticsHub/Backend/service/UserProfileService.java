package com.aestheticsHub.Backend.service;

import java.util.List;

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

    public List<UserProfile> getAllUserProfiles(String artistType){
        if ("all".equalsIgnoreCase(artistType)) {
            return userProfileRepository.findAll(); // Fetch all posts
        }
         return userProfileRepository.findByArtistType(artistType);
    }

    public UserProfile getUserProfileById(Long id){
        return userProfileRepository.findById(id).orElse(null);
    }


    public UserProfile SaveProfile(String nickName, String artistType, String bio, String profilePic, String contentType, byte[] picBytes) {
        Long userId = authInterceptor.getId();
        User user = userService.getUserById(userId);
        
        // Check if UserProfile already exists
        UserProfile userProfile = userProfileRepository.findByUserId(userId);
        
        if (userProfile != null) {
            // Update existing profile
            userProfile.setNickName(nickName);
            userProfile.setArtistType(artistType);
            userProfile.setBio(bio);
            userProfile.setProfilePic(profilePic);
            userProfile.setContentType(contentType);
            userProfile.setPicbytes(picBytes);
        } else {
            // Create new profile if not found
            userProfile = new UserProfile();
            userProfile.setNickName(nickName);
            userProfile.setArtistType(artistType);
            userProfile.setBio(bio);
            userProfile.setProfilePic(profilePic);
            userProfile.setContentType(contentType);
            userProfile.setPicbytes(picBytes);
            userProfile.setUser(user);
        }
        
        return userProfileRepository.save(userProfile);
    }
    

    public UserProfile getUserProfile(User user){
        return userProfileRepository.findByUser(user).orElse(null);
    }



}
