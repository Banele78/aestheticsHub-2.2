package com.aestheticsHub.Backend.DTO;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.aestheticsHub.Backend.model.Comments;
import com.aestheticsHub.Backend.model.Likes;
import com.aestheticsHub.Backend.model.Post;
import com.aestheticsHub.Backend.model.UserProfile;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;

public class UserProfileDTO {
    private Long id;
    private String nickName;
    private String profilePic;
    private String artistType;
    private String bio;
    private List<PostDTO> posts = new ArrayList<>();
    private List<Comments> comments = new ArrayList<>();
    private List<Likes> likes = new ArrayList<>();

    public UserProfileDTO(UserProfile userProfile){
        this.id= userProfile.getId();
        this.nickName = userProfile.getNickName();
        this.profilePic = userProfile.getProfilePic();
        this.artistType = userProfile.getArtistType();
        this.bio = userProfile.getBio();
        this.posts = userProfile.getPosts().stream()
                                    .map(PostDTO::new)
                                    .collect(Collectors.toList());
        this.comments = userProfile.getComments();
        this.likes = userProfile.getLikes();
    }

    

    public String getNickName() {
        return nickName;
    }
    public void setNickName(String nickName) {
        this.nickName = nickName;
    }
    public String getProfilePic() {
        return profilePic;
    }
    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }
    public String getArtistType() {
        return artistType;
    }
    public void setArtistType(String artistType) {
        this.artistType = artistType;
    }
    public String getBio() {
        return bio;
    }
    public void setBio(String bio) {
        this.bio = bio;
    }
    public List<PostDTO> getPosts() {
        return posts;
    }
    public void setPosts(List<PostDTO> posts) {
        this.posts = posts;
    }
    public List<Comments> getComments() {
        return comments;
    }
    public void setComments(List<Comments> comments) {
        this.comments = comments;
    }
    public List<Likes> getLikes() {
        return likes;
    }
    public void setLikes(List<Likes> likes) {
        this.likes = likes;
    }



    public Long getId() {
        return id;
    }



    public void setId(Long id) {
        this.id = id;
    }

    
}
