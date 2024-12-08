package com.aestheticsHub.Backend.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aestheticsHub.Backend.model.Comments;
import com.aestheticsHub.Backend.model.Post;


@Repository
public interface CommentsRepository extends JpaRepository<Comments,Long> {

    // Retrieve all comments for a specific post
    List<Comments> findByPost(Post post);

}
