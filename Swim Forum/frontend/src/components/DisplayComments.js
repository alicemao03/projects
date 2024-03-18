import React, { useState, useEffect } from "react";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import DisplayAvatar from './DisplayAvatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import GetName from './GetName';
import Dropdown from "./DropdownComments";



const DisplayComments = (props) => {
    let post_id = props.post.post_id;
    let full_name = props.post.user.first_name + " " + props.post.user.last_name
    console.log(JSON.stringify(props.post))
    let [comments, setComments] = useState([]);
    let commentsArray = Array.from(comments);

    useEffect(() => {
        getComments();
    }, []);

    // GET ALL THE POSTS WITH THE SAME POST ID
    let getComments = async () => {
        try {
            let url = 'http://127.0.0.1:8000/api/comments/' + post_id;

            const responce = await fetch(url, {
                method: 'GET',
                refresh_token: localStorage.getItem('refresh_token'),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : localStorage.getItem('authorization_key'),
                },
                withCredentials: true
            });

            let data = await responce.json()
            setComments(data)
        } catch (error) {
            console.log('Error: ', error);
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

    return (
        <div>
            {commentsArray.map((comment, index) => (
                <div key={index}>
                    <hr></hr>
                    <CardContent>
                        <CardHeader
                            avatar={
                                <DisplayAvatar id={props.post} />
                            }
                            // action={
                            //     <Dropdown id={comment.user}/>
                            // }
                            title={full_name}
                            subheader={convertTime(comment.time)}>
                        </CardHeader>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {comment.comment}
                            </Typography>
                        </CardContent>
                    </CardContent>
                </div>
            ))}
        </div>
    );
};

export default DisplayComments;