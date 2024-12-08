package com.aestheticsHub.Backend.web;

import java.io.IOException;

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

import com.aestheticsHub.Backend.auth.AuthInterceptor;
import com.aestheticsHub.Backend.model.Post;
import com.aestheticsHub.Backend.model.User;
import com.aestheticsHub.Backend.model.UserProfile;
import com.aestheticsHub.Backend.service.UserProfileService;
import com.aestheticsHub.Backend.service.UserService;



@RestController
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private UserService userService;

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

   @GetMapping("/api/getUserProfile")    
    public ResponseEntity<UserProfile> getUserprofile(){
       Long userId = authInterceptor.getId();
        User user= userService.getUserById(userId);
         UserProfile userProfile= userProfileService.getUserProfile(user);
        return ResponseEntity.ok(userProfile);
    }


      @GetMapping("/api/userProfile/{id}/ProfileImage")
public ResponseEntity<byte[]> getProfileImage(@PathVariable Long id) {
   UserProfile userProfile = userProfileService.getById(id);
    if (userProfile == null || userProfile.getPicbytes() == null) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found for post with id " + id);
    }

    byte[] imageData = userProfile.getPicbytes();
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.valueOf(userProfile.getContentType())); // Adjust based on your image type (e.g., IMAGE_PNG)
    return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
}
    

}
