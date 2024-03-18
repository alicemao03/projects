import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";

const CreatePost = () => {
    const navigate = useNavigate();
    let currentUser = localStorage.getItem('current_user');

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [filter, setFilter] = useState("");
    const [img_src, setImage] = useState("");
    
    let addPost = async () => {
        if (title !== "" && description !== "") {
            try {
                let url = 'http://127.0.0.1:8000/api/posts/addPost';
                const { data } = await axios.post('http://127.0.0.1:8000/api/posts/addPost',
                JSON.stringify({
                    title: title,
                    description: description,
                    filter: filter,
                    img_src: img_src,
                    user: currentUser,
                }), {
                    headers:
                        { 'Content-Type': 'application/json' ,
                        'Authorization' : localStorage.getItem('authorization_key')
                    }
                }, {
                    withCredentials: true
                });

                navigate('/OnTheRoof');
                alert('added')

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
            <Navbar />
            <div className="Auth-form-container">
                <div className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Create an Post</h3>
                        <div className="form-group mt-3">
                            <label>Title</label>
                            <input
                                type="text"
                                value={title}
                                className="form-control mt-1"
                                placeholder="Title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Description</label>
                            <textarea
                                type="textarea"
                                value={description}
                                className="form-control mt-1"
                                placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <FormControl sx={{ minWidth: 320 }} size="small">
                                <InputLabel>Filter</InputLabel>
                                <Select
                                    id="filter"
                                    value={filter}
                                    label="Age"
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <MenuItem value={filter}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={filter}>Birthday</MenuItem>
                                    <MenuItem value={filter}>Logistics</MenuItem>
                                    <MenuItem value={filter}>Parties</MenuItem>
                                    <MenuItem value={filter}>Socials</MenuItem>
                                </Select>
                            </FormControl>
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
                            <button type="submit" className="btn btn-primary submitBtn" onClick={addPost}>
                                Create Post!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost;