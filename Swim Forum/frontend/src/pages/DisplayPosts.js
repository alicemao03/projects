import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import DisplayAvatar from '../components/DisplayAvatar';
import DisplayActions from '../components/DisplayActions';
import Navbar from '../components/Navbar';
import ShowMenu from '../components/EditMenu';
import FilterBar from '../components/FilterBar';
import axios from "axios";
import Dropdown from "../components/Dropdown";

const DisplayPosts = () => {
    const navigate = useNavigate();
    let currentUser = localStorage.getItem('current_user');
    console.log(currentUser);
    let [allPost, setAllPost] = useState([]);
    let postArray = Array.from(allPost);

    useEffect(() => {
        // getPost();
        if (localStorage.getItem('access_token') === null || localStorage.getItem('refresh_token') === undefined) {
            // alert("Log in")
            navigate('/login');
        }
        else {
            getPost();
        };
    }, []);


    let getPost = async () => {
        try {
            let response = await fetch('http://localhost:8000/api/posts/', {
                method: 'GET',
                refresh_token: localStorage.getItem('refresh_token'),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : localStorage.getItem('authorization_key'),
                },
                withCredentials: true
            });
            let data = await response.json()
            setAllPost(data)
        } catch (error) {
            console.log('There was an error', error);
        }
    }


    const convertTime = (currTime) => {
        let regexPattern = /(\d{4})-(\d{2})-(\d{2})/g;
        let [, currYear, currMonth, currDay] = regexPattern.exec(currTime) || [];

        const d = new Date();
        d.setMonth(currMonth - 1);
        const monthName = d.toLocaleString("default", { month: "long" });

        let dateString = monthName + " " + currDay + ", " + currYear;
        return dateString;
    }

    const fullURL = (currURL) => {
        if (currURL == null) {
            return;
        }
        let url = 'http://127.0.0.1:8000/' + currURL;

        return (<img alt="postIMG" src={url}></img>)
    }

    return (
        <div >
            <Navbar />
            {/* <FilterBar /> */}
            {postArray.map((post, index) => (
                <div key={index}>
                    <Card sx={{ bgcolor: 'beige', margin: '3%' }}>
                        <CardHeader
                            avatar={
                                <DisplayAvatar id={post} />
                            }
                            action={
                                <Dropdown post={post} />
                            }
                            title={post.title}
                            subheader={convertTime(post.time)}>
                        </CardHeader>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {post.description}
                            </Typography>
                            {fullURL(post.img_src)}
                        </CardContent>
                        <DisplayActions post={post} />
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default DisplayPosts;