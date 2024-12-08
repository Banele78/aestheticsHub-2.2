package com.aestheticsHub.Backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.aestheticsHub.Backend.model.Comments;
import com.aestheticsHub.Backend.model.Post;
import com.aestheticsHub.Backend.repository.CommentsRepository;

@Service
public class CommentsService {

    @Autowired
    private CommentsRepository commentsRepository;

   public List<Comments> getCommentsByPostId(Post post){
    return commentsRepository.findByPost(post);
   }

    public Comments pComments(Comments comment){
      
        return commentsRepository.save(comment);
    }

}
