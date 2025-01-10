package com.aestheticsHub.Backend.web;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.aestheticsHub.Backend.DTO.PostDTO;
import com.aestheticsHub.Backend.DTO.UserProfileDTO;
import com.aestheticsHub.Backend.auth.AuthInterceptor;
import com.aestheticsHub.Backend.model.Likes;
import com.aestheticsHub.Backend.model.Post;
import com.aestheticsHub.Backend.model.User;
import com.aestheticsHub.Backend.model.UserProfile;
import com.aestheticsHub.Backend.service.LikesService;
import com.aestheticsHub.Backend.service.UserProfileService;
import com.aestheticsHub.Backend.service.UserService;



@RestController
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private UserService userService;
    @Autowired
    private LikesService likesService;

    @Autowired
    private AuthInterceptor authInterceptor;

    @PostMapping("/api/createProfile")
    public ResponseEntity<String> createUserProfile( @RequestPart("nickName") String nickName ,
    @RequestPart("artistType") String artistType ,
    @RequestPart("bio") String bio ,
    @RequestPart("profilePic") MultipartFile file,BindingResult result)  throws IOException{
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid user data");
        }
       
        userProfileService.SaveProfile(nickName,artistType,bio, file.getOriginalFilename(), file.getContentType(), file.getBytes());
        return ResponseEntity.ok("profile created");
    }

    @GetMapping("/api/{artistType}/getAllProfiles")
    public ResponseEntity<List<UserProfile>> getAllProfiles(@PathVariable String artistType){
        return ResponseEntity.ok(userProfileService.getAllUserProfiles(artistType));
    }

  
   @GetMapping("/api/getUserProfile")    
    public ResponseEntity<UserProfileDTO> getUserprofile(){
       String userId = authInterceptor.getId();
        User user= userService.getUserById(Long.valueOf(userId));
         UserProfile userProfile= userProfileService.getUserProfile(user);

         if (userProfile == null ) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user profile not found");
        }

          List<Likes> userLikes = likesService.getLikeByUserProile(userProfile);
    Map<Long, Likes> likesMap = userLikes.stream()
                                          .collect(Collectors.toMap(like -> like.getPost().getId(), like -> like));
           
    List<Post> posts = userProfile.getPosts();

    // Transform Posts to DTOs with like information
    List<PostDTO> postDTOs = posts.stream()
                                  .map(post -> {
                                      boolean likedByUser = likesMap.containsKey(post.getId());
                                      return new PostDTO(post, likedByUser);
                                  })
                                  .collect(Collectors.toList());
                                  
          
        UserProfileDTO userProfileDTO = new UserProfileDTO(userProfile);
        userProfileDTO.setPosts(postDTOs);
        return ResponseEntity.ok(userProfileDTO);
    }


      @GetMapping("/api/userProfile/{id}/ProfileImage")
public ResponseEntity<byte[]> getProfileImage(@PathVariable Long id) {
   UserProfile userProfile = userProfileService.getUserProfileById(id);
    if (userProfile == null || userProfile.getPicbytes() == null) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found for post with id " + id);
    }

    byte[] imageData = userProfile.getPicbytes();
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.valueOf(userProfile.getContentType())); // Adjust based on your image type (e.g., IMAGE_PNG)
    return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
}


@GetMapping("/api/{userProfileId}/getUserProfiles")    
public ResponseEntity<UserProfileDTO> getUserprofiles(@PathVariable Long userProfileId){
   //get the user profile of the person who posted
     UserProfile userProfile= userProfileService.getUserProfileById(userProfileId);

     //get the user profile of the person who is logged in
     String userId = authInterceptor.getId();
        User user= userService.getUserById(Long.valueOf(userId));
         UserProfile userProfileLoggedin= userProfileService.getUserProfile(user);

     
     if (userProfile == null ) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user profile not found");
    }

      List<Likes> userLikes = likesService.getLikeByUserProile(userProfileLoggedin);
Map<Long, Likes> likesMap = userLikes.stream()
                                      .collect(Collectors.toMap(like -> like.getPost().getId(), like -> like));
       
List<Post> posts = userProfile.getPosts();

// Transform Posts to DTOs with like information
List<PostDTO> postDTOs = posts.stream()
                              .map(post -> {
                                  boolean likedByUser = likesMap.containsKey(post.getId());
                                  return new PostDTO(post, likedByUser);
                              })
                              .collect(Collectors.toList());
                              
      
    UserProfileDTO userProfileDTO = new UserProfileDTO(userProfile);
    userProfileDTO.setPosts(postDTOs);
    return ResponseEntity.ok(userProfileDTO);
}
    

}
