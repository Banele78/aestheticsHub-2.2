import React, { useContext, useEffect, useState } from 'react';
import "./comments.css";
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import {axiosInstance} from '../../helper/axiosConfig';
import { UserProfileContext } from '../../helper/UserProfileContext';


function Comments({ open, setOpen }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const { userProfile } = useContext(UserProfileContext);

    const initialValues = { comment: "", post_id: open };

    const handleAddComment = async (values, { resetForm }) => {
        setSubmitting(true);
        try {
            await axiosInstance.post(`/${userProfile.id}/comment`, values, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            // Fetch the updated comments list
            const response = await axiosInstance.get(`/${open}/getComments`);
            setComments(response.data);
    
            resetForm();
        } catch (error) {
            console.error("Error adding comment:", error);
        }finally {
            setSubmitting(false);
        }
    };
    

    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get(`/${open}/getComments`)
            .then((response) => {
                setComments(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
                setError("Failed to load comments. Please try again.");
                setLoading(false);
            });
    }, [open]);

    return (
        <div className={`comments ${open ? 'open' : ''}`}>
            <div className="box">
            <div className="backB">
                        <img
                            src="/Vector.png"
                            alt="Back"
                            onClick={() => setOpen((prev) => !prev)}
                        />
                    </div>
                <div className="box2">
                 

                    {loading ? (
                        <div className="spinner"><span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></div>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className="comment">
                                <p className="username">
                                    {comment.userProfile?.nickName || "Anonymous"}
                                </p>
                                <div className="input">
                                    <p>{comment.comment || "No comment available"}</p>
                                </div>
                                <div className="icons">
                                <FavoriteBorderOutlinedIcon className='IconColor' />
                                  
                                <CommentIcon className='IconColor' />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="NotFound">No comments found</p>
                    )}

<Formik
  initialValues={initialValues}
  onSubmit={handleAddComment}
>
  {({ values }) => (
    <Form>
      <div className="textarea-container">
        <Field
          as="textarea"
          name="comment"
          rows="10"
          cols="30"
          placeholder="Add a comment"
        />
        <button
          type="submit"
          className="send-button"
          disabled={!values.comment || values.comment.trim() === "" || submitting}
        >
          {submitting ? <div className='spinner'></div> : <SendIcon />}
        </button>
      </div>
      {error && <p className="form-error">{error}</p>}
    </Form>
  )}
</Formik>

                </div>
            </div>
        </div>
    );
}

export default Comments;
