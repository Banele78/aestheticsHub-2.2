import React, { useEffect, useState } from 'react';
import "./comments.css";
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

function Comments({ open, setOpen }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const initialValues = { comment: "", post_id: open };

    const handleAddComment = async (values, { resetForm }) => {
        setSubmitting(true);
        try {
            await axios.post('http://localhost:8080/api/comment', values, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            // Fetch the updated comments list
            const response = await axios.get(`http://localhost:8080/api/${open}/getComments`);
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
        axios
            .get(`http://localhost:8080/api/${open}/getComments`)
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
                <div className="box2">
                    <div className="backB">
                        <img
                            src="./Vector.png"
                            alt="Back"
                            onClick={() => setOpen((prev) => !prev)}
                        />
                    </div>

                    {loading ? (
                        <p>Loading comments...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className="view">
                                <p className="username">
                                    {comment.user?.userProfile?.nickName || "Anonymous"}
                                </p>
                                <div className="input">
                                    <p>{comment.comment || "No comment available"}</p>
                                </div>
                                <div className="icons">
                                    <img src="./Heart.png" alt="Like" />
                                    <img src="./ChatFill.png" alt="Comment" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="NotFound">No comments found</p>
                    )}

                    <Formik initialValues={initialValues} onSubmit={handleAddComment}>
                        <Form>
                            <div className="textarea-container">
                                <Field
                                    as="textarea"
                                    name="comment"
                                    rows="10"
                                    cols="30"
                                    placeholder="Add a comment"
                                />
                                <button type="submit" className="send-button" disabled={submitting}>
                                    {submitting ? "Sending..." : <img src="./SendFill.png" alt="Send" />}
                                </button>
                            </div>
                            {error && <p className="form-error">{error}</p>}
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Comments;
