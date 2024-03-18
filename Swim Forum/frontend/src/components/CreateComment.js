import React, { useState } from 'react';
import TelegramIcon from '@mui/icons-material/Telegram';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { TextField } from '@mui/material';

const CreateComment = (props) => {
    const post_id = props.post.post_id;

    const [comment, setComment] = useState("");

    let addComment = async () => {
        console.log("post" + post_id)
        if (comment !== "") {
            try {
                let url = 'http://127.0.0.1:8000/api/addComment/';
                await fetch(url, {
                    method: 'POST',
                    refresh_token: localStorage.getItem('refresh_token'),
                    body: JSON.stringify({
                        post_id: post_id,
                        user_id: localStorage.getItem('current_user'),
                        comment: comment,
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });

                alert("Comment added!!")
                window.location.reload(false);

            } catch (error) {
                console.log('There was an error', error);
            }
        }
        else {
            alert("One of more fields have been left empty")
        }
    }

    return (
        <div class="addComments">
            <div className="commentForm">
                <hr></hr>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Add Comment"
                    type="email"
                    value={comment}
                    fullWidth
                    variant="standard"
                    onChange={(e) => setComment(e.target.value)}

                />
                <IconButton aria-label="add to favorites" onClick={addComment}>
                    <TelegramIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default CreateComment;