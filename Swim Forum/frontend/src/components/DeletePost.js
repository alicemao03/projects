import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button } from '@mui/material';
import Slide from '@mui/material/Slide';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeletePost = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseDelete = () => {
        setOpen(false);
        deletePost();
    };

    let deletePost = async () => {
        try {
            await fetch('http://localhost:8000/api/posts/delete/' + props.post.post_id, {
                method: 'DELETE',
                refresh_token: localStorage.getItem('refresh_token'),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authorization_key'),
                },
                withCredentials: true
            });
            alert('edit success')
            // console.log(response)
            window.location.reload(false);
        } catch (error) {
            console.log('There was an error', error);
        }
    }

    return (
        <div>
            <MenuItem onClick={handleClickOpen}><DeleteIcon />Delete</MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Delete Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCloseDelete}>Delete Post</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeletePost;
