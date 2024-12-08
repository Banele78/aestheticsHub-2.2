package com.aestheticsHub.Backend.DTO;

import jakarta.validation.constraints.NotBlank;

public class LikesDTO {

    @NotBlank(message = "post_id is required")
    private Long postId;

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    

}
