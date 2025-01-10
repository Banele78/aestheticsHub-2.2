package com.aestheticsHub.Backend.service;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.aestheticsHub.Backend.auth.AuthInterceptor;
import com.aestheticsHub.Backend.model.Post;
import com.aestheticsHub.Backend.model.User;
import com.aestheticsHub.Backend.model.UserProfile;
import com.aestheticsHub.Backend.repository.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private AuthInterceptor authInterceptor;

    public List<Post> getposts(){
        
        return postRepository.findAll();
    }

    //post a post
    public Post post(Long userProfile_id,String Artname,String Caption, String artistType, String artPic, String contentType, byte[] Picbytes){
      

        UserProfile userProfile = userProfileService.getUserProfileById(userProfile_id);

        Post post = new Post();

        post.setArtname(Artname);
        post.setCaption(Caption);
        post.setArtistType(artistType);
        post.setArtPic(artPic);
        post.setContentType(contentType);
        post.setPicbytes(Picbytes);
       
        post.setUserProfile(userProfile);
        
        return postRepository.save(post);
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }


    public List<Post> getPostsByArtistTypeOrAll (String artistType){
        if ("all".equalsIgnoreCase(artistType)) {
            return postRepository.findAll(); // Fetch all posts
        }
         return postRepository.findByArtistType(artistType);
    }

}
