package com.aestheticsHub.Backend.service;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.aestheticsHub.Backend.auth.AuthInterceptor;
import com.aestheticsHub.Backend.model.Post;
import com.aestheticsHub.Backend.model.User;
import com.aestheticsHub.Backend.repository.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthInterceptor authInterceptor;

    public List<Post> getposts(){
        
        return postRepository.findAll();
    }

    public Post post(String Artname, String artistType, String artPic, String contentType, byte[] Picbytes){
        Long userId = authInterceptor.getId();
        User user = userService.getUserById(userId);

        Post post = new Post();

        post.setArtname(Artname);
        post.setArtistType(artistType);
        post.setArtPic(artPic);
        post.setContentType(contentType);
        post.setPicbytes(Picbytes);
       
        post.setUser(user);
        
        return postRepository.save(post);
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }

}
