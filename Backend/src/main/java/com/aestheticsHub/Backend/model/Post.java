package com.aestheticsHub.Backend.model;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

//import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


@Entity
@Table(name="posts")
public class Post {

    @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message ="artname is required")
    private String Artname;

  
    private String Caption;

    @NotBlank(message ="artistType is required")
    private String artistType;

    @NotBlank(message = "artPic is required")
    private String artPic;

    @NotBlank(message = "contentType is required")
    private String contentType;

    @JsonIgnore
    @Lob
    private byte[] Picbytes;

     @CreationTimestamp
     @Column(nullable = false)
    private LocalDate createdDate;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalTime createdTime;

    @ManyToOne
    @JoinColumn(name = "userProfile_id", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties("posts")//to not cause a inifinite loop
    private UserProfile userProfile;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comments> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
   
    private List<Likes> likes = new ArrayList<>();

    public Post(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getArtname() {
        return Artname;
    }

    public void setArtname(String artname) {
        Artname = artname;
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

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public byte[] getPicbytes() {
        return Picbytes;
    }

    public void setPicbytes(byte[] picbytes) {
        Picbytes = picbytes;
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

    public List<Comments> getComments() {
        return comments;
    }

    public void setComments(List<Comments> comments) {
        this.comments = comments;
        for (Comments comment : comments) {
            comment.setPost(this);
        }
    }

    public List<Likes> getLikes() {
        return likes;
    }

    public void setLikes(List<Likes> likes) {
        this.likes = likes;

        for (Likes like : likes) {
            like.setPost(this);
        }

        
    }

    public String getCaption() {
        return Caption;
    }

    public void setCaption(String caption) {
        this.Caption = caption;
    }

    

}
