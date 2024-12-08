package com.aestheticsHub.Backend.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.aestheticsHub.Backend.DTO.CommentDTO;
import com.aestheticsHub.Backend.auth.AuthInterceptor;
import com.aestheticsHub.Backend.model.Comments;
import com.aestheticsHub.Backend.model.Post;
import com.aestheticsHub.Backend.model.User;
import com.aestheticsHub.Backend.service.CommentsService;
import com.aestheticsHub.Backend.service.PostService;
import com.aestheticsHub.Backend.service.UserService;

@RestController
public class CommentsController {


    @Autowired
    private CommentsService commentsService;

     @Autowired
    private AuthInterceptor authInterceptor;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @PostMapping("/api/comment")
    public ResponseEntity<CommentDTO> pComments(@RequestBody CommentDTO commentDTO){
        Long userId = authInterceptor.getId();
        User user = userService.getUserById(userId);
        Post post = postService.getPostById(commentDTO.getPost_id());
        
        Comments comments = new Comments();
        comments.setComment(commentDTO.getComment());
        comments.setPost(post);
        comments.setUser(user);

        commentsService.pComments(comments);
        return ResponseEntity.ok(commentDTO);
    }

    @GetMapping("/api/{id}/getComments")
    public ResponseEntity<List<Comments>> getComments(@PathVariable Long id){
        Post post = postService.getPostById(id);
        List<Comments> comments = commentsService.getCommentsByPostId(post);
        if (comments.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 No Content if no posts are found
        }
        return ResponseEntity.ok(comments);
    }


}
