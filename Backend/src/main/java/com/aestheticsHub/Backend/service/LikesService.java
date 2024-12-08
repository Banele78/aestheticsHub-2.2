package com.aestheticsHub.Backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aestheticsHub.Backend.model.Likes;
import com.aestheticsHub.Backend.model.Post;
import com.aestheticsHub.Backend.model.User;
import com.aestheticsHub.Backend.repository.LikesRepository;

@Service
public class LikesService {

    @Autowired
    private LikesRepository likesRepository;

    public Likes saveLike(Likes like){
        return likesRepository.save(like);
    }

    public Likes getLikeByUserAndPost(User user, Post post) {
        return likesRepository.findByUserAndPost(user, post);
    }

    public void deleteLike(Likes like) {
        likesRepository.delete(like);
    }

    public List <Likes> getLikeByUser(User user){
        return likesRepository.findByUser(user);
    }



}
