package com.aestheticsHub.Backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aestheticsHub.Backend.model.Likes;
import com.aestheticsHub.Backend.model.Post;
import com.aestheticsHub.Backend.model.User;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {
   Likes findByUserAndPost(User user, Post post);

    List <Likes> findByUser(User user);
}
