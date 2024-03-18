import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditPost = (props) => {
    const [open, setOpen] = React.useState(false);


    const [title, setTitle] = useState(props.post.title);
    const [description, setDescription] = useState(props.post.description);
    // const [filter, setFilter] = useState(props.post.title);
    const [img_src, setImage] = useState(props.post.img_src);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let editPost = async () => {
        if (title !== "" && description !== "") {
            try {
                let img = img_src
                if (img_src === "") {
                    img = null;
                }
                let url = 'http://127.0.0.1:8000/api/posts/edit/' + props.post.post_id;

                await fetch(url, {
                    method: 'PUT',
                    refresh_token: localStorage.getItem('refresh_token'),
                    body: JSON.stringify({
                        title: title,
                        description: description,
                        img_src: img,
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });

                alert('edit success')
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
        <div>
            <MenuItem onClick={handleClickOpen}><EditIcon />Edit</MenuItem>
            <Dialog
                // fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}>
                <DialogContent>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Edit Post</h3>
                        <div className="form-group mt-3">
                            <label>Title</label>
                            <input
                                type="text"
                                value={title}
                                className="form-control mt-1"
                                placeholder={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Description</label>
                            <textarea
                                type="textarea"
                                value={description}
                                className="form-control mt-1"
                                placeholder={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Add image</label>
                            <input
                                type="file"
                                value={img_src}
                                className="mt-1"
                                placeholder="add avatar"
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary submitBtn" onClick={editPost}>
                                Edit Post!
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditPost;