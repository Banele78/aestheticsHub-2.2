package com.aestheticsHub.Backend.model;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name ="UserProfile")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "NickName is required")
    private String nickName;

    @NotBlank(message = "Profile picture is required")
    private String profilePic;

    @NotBlank(message = "artistType is required")
    private String artistType;

    @NotBlank(message = "Bio is required")
    private String bio;

    @JsonIgnore
    @Lob
    private byte[] Picbytes;

    @NotBlank(message = "contentType is required")
    private String contentType;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    @JsonIgnore    
    private User user;

     @OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL, orphanRemoval = true)
   @JsonIgnoreProperties("userProfile")
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("userProfile")
    private List<Comments> comments = new ArrayList<>();

    @OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("userProfile")
    private List<Likes> likes = new ArrayList<>();

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

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public UserProfile(){}

   

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

   

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getArtistType() {
        return artistType;
    }

    public void setArtistType(String artistType) {
        this.artistType = artistType;
    }

    public List<Post> getPosts() {
        return posts;
    }
    public void setPosts(List<Post> posts) {
        this.posts = posts;
        for (Post post : posts) {
            post.setUserProfile(this);
        }
    }

    public List<Comments> getComments() {
        return comments;
    }

    public void setComments(List<Comments> comments) {
        this.comments = comments;
        for (Comments comment : comments) {
            comment.setUserProfile(this);
        }
    }


    public List<Likes> getLikes() {
        return likes;
    }
    public void setLikes(List<Likes> likes) {
        this.likes = likes;
        for (Likes like : likes) {
            like.setUserProfile(this);
        }
    }


    

}
