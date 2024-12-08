package com.aestheticsHub.Backend.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.aestheticsHub.Backend.DTO.LikesDTO;
import com.aestheticsHub.Backend.auth.AuthInterceptor;
import com.aestheticsHub.Backend.model.Likes;
import com.aestheticsHub.Backend.model.Post;
import com.aestheticsHub.Backend.model.User;
import com.aestheticsHub.Backend.service.LikesService;
import com.aestheticsHub.Backend.service.PostService;
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
    private AuthInterceptor authInterceptor;

    @PostMapping("/api/like")
    public ResponseEntity<String> likeApost(@RequestBody LikesDTO likesDTO){
       // Get the user ID from the interceptor
    Long userId = authInterceptor.getId();
    if (userId == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
    }

    // Get the user and post objects
    User user = userService.getUserById(userId);
    if (user == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    Post post = postService.getPostById(likesDTO.getPostId());
    if (post == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
    }

   
    // Check if the user has already liked the post
    Likes existingLike = likesService.getLikeByUserAndPost(user, post);
    if (existingLike != null) {
        // If the like exists, delete it
        likesService.deleteLike(existingLike);
        return ResponseEntity.ok("Like removed");
    }

    // Create and save the like
    Likes like = new Likes();
    like.setPost(post);
    like.setUser(user);
    likesService.saveLike(like);
         
        return ResponseEntity.ok("like posted");
    }

}
