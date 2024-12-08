package com.aestheticsHub.Backend.DTO;

import java.time.LocalDate;
import java.time.LocalTime;

import com.aestheticsHub.Backend.model.Post;

public class PostDTO {
    private Long id;
    private String artName;
    private String artistType;
    private String artPic;
    private String contentType;
    private LocalDate createdDate;
    private LocalTime createdTime;
    private boolean likedByUser;

    public PostDTO(Post post, boolean likedByUser) {
        this.id = post.getId();
        this.artName = post.getArtname();
        this.artistType = post.getArtistType();
        this.artPic = post.getArtPic();
        this.contentType = post.getContentType();
        this.createdDate = post.getCreatedDate();
        this.createdTime = post.getCreatedTime();
        this.likedByUser = likedByUser;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getArtName() {
        return artName;
    }

    public void setArtName(String artName) {
        this.artName = artName;
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

    

    // Getters and setters (optional, depending on use case)
}
