package com.aestheticsHub.Backend.DTO;

import jakarta.validation.constraints.NotBlank;

public class CommentDTO {

    @NotBlank(message = "comment is required")
    private String comment;

    @NotBlank(message = "post_id is required")
    private Long post_id;

    

    public CommentDTO(){}



    public String getComment() {
        return comment;
    }



    public void setComment(String comment) {
        this.comment = comment;
    }



    public Long getPost_id() {
        return post_id;
    }



    public void setPost_id(Long post_id) {
        this.post_id = post_id;
    }

}
