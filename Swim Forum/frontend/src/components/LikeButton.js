import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { json } from 'react-router-dom';


const LikeButton = (props) => {
    const user_id = props.post.user.id;
    console.log("id" + JSON.stringify(props.post.post_id));
    let [liked, setLiked] = useState(false);
    let [btnColor, setBtnColor] = useState('darkgray');
    let [isSet, setIsSet] = useState(false);

    // useEffect(() => {
    //     getLike();
    // });

    let getLike = async () => {
        try {
            let url = 'http://127.0.0.1:8000/api/likes/' + user_id + '/' + props.post.post_id;

            const response = await fetch(url, {
                method: 'GET',
                refresh_token: localStorage.getItem('refresh_token'),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authorization_key'),
                },
                withCredentials: true
            });
            let data = await response.json()
            setLiked(data.liked)
            console.log("lie:" + liked)

        } catch (error) {
            console.log('There was an error', error);
        }
    }

    let addLike = async () => {
        try {
            let url = 'http://127.0.0.1:8000/api/addLikes/' + user_id + '/' + props.post.post_id;

            const response = await fetch(url, {
                method: 'POST',
                refresh_token: localStorage.getItem('refresh_token'),
                body: JSON.stringify({
                    user_id: user_id,
                    post_id: props.post.post_id,
                    liked: liked,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authorization_key'),
                },
                withCredentials: true
            });
            let data = await response.json()
            // setLiked(data)
            console.log("like: " + JSON.stringify(data)
            )

        } catch (error) {
            updateLike();
            // console.log('There was an error', error);
        }
    }

    let updateLike = async () => {
        try {
            let url = 'http://127.0.0.1:8000/api/addLikes/' + user_id + '/' + props.post.post_id;

            const response = await fetch(url, {
                method: 'PUT',
                refresh_token: localStorage.getItem('refresh_token'),
                body: JSON.stringify({
                    user_id: user_id,
                    post_id: props.post.post_id,
                    liked: liked,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authorization_key'),
                },
                withCredentials: true
            });
            let data = await response.json()

        } catch (error) {
            console.log('There was an error', error);
        }
    }

    const checkSet = (e) => {
        if(!isSet){
            setIsSet(true);
            // isSet ===
            addLike();
        }
        else{
            likeButtonClick(e);
        }
    }
    const likeButtonClick = (e) => {
        liked = !liked;

        if (btnColor === 'red'){
            setBtnColor('gray');
        }
        else{
            setBtnColor('red');
        }
        btnColor = e.target.style.backgroundColor;

        addLike();
    };


    return (
        <IconButton id="likeBtn" aria-label="add to favorites" style={{ color: btnColor}} onClick={likeButtonClick}>
            <FavoriteIcon />
        </IconButton>
    )
}

export default LikeButton;