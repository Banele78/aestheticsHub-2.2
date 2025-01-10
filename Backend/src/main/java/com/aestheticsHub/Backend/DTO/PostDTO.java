package com.aestheticsHub.Backend.DTO;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.aestheticsHub.Backend.model.Likes;
import com.aestheticsHub.Backend.model.Post;
import com.aestheticsHub.Backend.model.UserProfile;

public class PostDTO {
    private Long id;
    private String Artname;
    private String artistType;
    private String Caption;
    private String artPic;
    private String contentType;
    private LocalDate createdDate;
    private LocalTime createdTime;
    private boolean likedByUser;
      private List<Likes> likes = new ArrayList<>();
      private UserProfile userProfile;

    public PostDTO(Post post, boolean likedByUser) {
        this.id = post.getId();
        this.Artname = post.getArtname();
        this.Caption = post.getCaption();
        this.artistType = post.getArtistType();
        this.artPic = post.getArtPic();
        this.contentType = post.getContentType();
        this.createdDate = post.getCreatedDate();
        this.createdTime = post.getCreatedTime();
        this.likes = post.getLikes();
        this.userProfile =post.getUserProfile();
        this.likedByUser = likedByUser;
    }

    public PostDTO(Post post) {
        this.id = post.getId();
        this.Artname = post.getArtname();
        this.Caption = post.getCaption();
        this.artistType = post.getArtistType();
        this.artPic = post.getArtPic();
        this.contentType = post.getContentType();
        this.createdDate = post.getCreatedDate();
        this.createdTime = post.getCreatedTime();
        this.likes = post.getLikes();
        this.userProfile =post.getUserProfile();
       
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getArtName() {
        return Artname;
    }

    public void setArtName(String Artname) {
        this.Artname = Artname;
    }

    public String getArtistType() {
        return artistType;
    }

    public void setArtistType(String artistType) {
        this.artistType = artistType;
    }

    public String getArtPic() {
        return artPic;
    }

    public void setArtPic(String artPic) {
        this.artPic = artPic;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public LocalTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalTime createdTime) {
        this.createdTime = createdTime;
    }

    public boolean isLikedByUser() {
        return likedByUser;
    }

    public void setLikedByUser(boolean likedByUser) {
        this.likedByUser = likedByUser;
    }

    public List<Likes> getLikes() {
        return likes;
    }

    public void setLikes(List<Likes> likes) {
        this.likes = likes;
    }

    

    public String getCaption() {
        return Caption;
    }

    public void setCaption(String caption) {
        this.Caption = caption;
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    
    

    // Getters and setters (optional, depending on use case)
}
