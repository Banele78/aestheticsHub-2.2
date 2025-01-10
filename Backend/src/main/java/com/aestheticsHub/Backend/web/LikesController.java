package com.aestheticsHub.Backend.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.aestheticsHub.Backend.DTO.LikesDTO;
import com.aestheticsHub.Backend.auth.AuthInterceptor;
import com.aestheticsHub.Backend.model.Likes;
import com.aestheticsHub.Backend.model.Post;
import com.aestheticsHub.Backend.model.User;
import com.aestheticsHub.Backend.model.UserProfile;
import com.aestheticsHub.Backend.service.LikesService;
import com.aestheticsHub.Backend.service.PostService;
import com.aestheticsHub.Backend.service.UserProfileService;
import com.aestheticsHub.Backend.service.UserService;

@RestController
public class LikesController {

    @Autowired
    private LikesService likesService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private AuthInterceptor authInterceptor;

    @PostMapping("/api/{userProfile_id}/like")
    public ResponseEntity<String> likeApost(@RequestBody LikesDTO likesDTO,@PathVariable Long userProfile_id){
    

    // Get the user and post objects
    
    UserProfile userProfile = userProfileService.getUserProfileById(userProfile_id);
    if (userProfile == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    Post post = postService.getPostById(likesDTO.getPostId());
    if (post == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
    }

   
    // Check if the user has already liked the post
    Likes existingLike = likesService.getLikeByUserProfileAndPost(userProfile, post);
    if (existingLike != null) {
        // If the like exists, delete it
        likesService.deleteLike(existingLike);
        return ResponseEntity.ok("Like removed");
    }

    // Create and save the like
    Likes like = new Likes();
    like.setPost(post);
    like.setUserProfile(userProfile);
    likesService.saveLike(like);
         
        return ResponseEntity.ok("like posted");
    }

}
