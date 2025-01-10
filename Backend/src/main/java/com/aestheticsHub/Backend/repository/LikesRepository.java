package com.aestheticsHub.Backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aestheticsHub.Backend.model.Likes;
import com.aestheticsHub.Backend.model.Post;
import com.aestheticsHub.Backend.model.UserProfile;


@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {
   Likes findByUserProfileAndPost(UserProfile userProfile, Post post);

    List <Likes> findByUserProfile(UserProfile userProfile);
}
