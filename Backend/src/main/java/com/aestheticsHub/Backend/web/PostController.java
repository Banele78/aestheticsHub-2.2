package com.aestheticsHub.Backend.web;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.aestheticsHub.Backend.DTO.PostDTO;
import com.aestheticsHub.Backend.auth.AuthInterceptor;
import com.aestheticsHub.Backend.model.Likes;
import com.aestheticsHub.Backend.model.Post;
import com.aestheticsHub.Backend.model.User;
import com.aestheticsHub.Backend.service.LikesService;
import com.aestheticsHub.Backend.service.PostService;
import com.aestheticsHub.Backend.service.UserService;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private LikesService likesService;

    @Autowired
    private AuthInterceptor authInterceptor;

    @Autowired
    private UserService userService;

//create post
    @PostMapping("/api/post")
    public ResponseEntity<String> createPost(@RequestPart("Artname") String Artname,
    @RequestPart("artistType") String artistType,
    @RequestPart("artPic") MultipartFile artPic,
    BindingResult result
    ) throws IOException{

        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid user data");
        }
        postService.post(Artname, artistType, artPic.getOriginalFilename(), artPic.getContentType(), artPic.getBytes());
         return ResponseEntity.ok("post created");
    }



    //get posts by artistType
@GetMapping("/api/{artistType}/posts")
public ResponseEntity<List<PostDTO>> getPostsByArtistType(@PathVariable String artistType) {
    // Get the ID of the authenticated user
    Long userId = authInterceptor.getId();

    if (userId == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());
    }

    // Retrieve the user by ID
    User user = userService.getUserById(userId);
    if (user == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
    }

     // Retrieve all posts
     List<Post> posts = postService.getPostsByArtistTypeOrAll(artistType);;
       if (posts.isEmpty()) {
        return ResponseEntity.noContent().build();
    }
   

    // Retrieve all likes for the user in a single query
    List<Likes> userLikes = likesService.getLikeByUser(user);
    Map<Long, Likes> likesMap = userLikes.stream()
                                          .collect(Collectors.toMap(like -> like.getPost().getId(), like -> like));

    // Transform Posts to DTOs with like information
    List<PostDTO> postDTOs = posts.stream()
                                  .map(post -> {
                                      boolean likedByUser = likesMap.containsKey(post.getId());
                                      return new PostDTO(post, likedByUser);
                                  })
                                  .collect(Collectors.toList());

    return ResponseEntity.ok(postDTOs);
}


//image
@GetMapping("/api/posts/{id}/image")
public ResponseEntity<byte[]> getPostImage(@PathVariable Long id) {
    Post post = postService.getPostById(id);
    if (post == null || post.getPicbytes() == null) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found for post with id " + id);
    }

    byte[] imageData = post.getPicbytes();
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.valueOf(post.getContentType())); // Adjust based on your image type (e.g., IMAGE_PNG)
    return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
}

}
