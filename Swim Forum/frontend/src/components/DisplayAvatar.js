import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';



const CardHeader = (props) => {
    let userID = props.id.user.id;
    let first_name = props.id.user.first_name;
    let last_name = props.id.user.last_name;

    let [allUser, setUser] = useState([]);
    let userArray = Array.from(allUser);
    
    useEffect(() => {
        getUser();
    }, []);

    let getUser = async () => {
        try {
            let url = 'http://127.0.0.1:8000/api/users/getAvatar/' + userID;

            const response = await fetch(url, {
                method: 'GET',
                refresh_token: localStorage.getItem('refresh_token'),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : localStorage.getItem('authorization_key'),
                },
            });
            let data = await response.json()
            setUser(data)
        } catch (error) {
            // console.log('There was an error', error);
            return (
                <Avatar>
                {firstInitial + lastInitial}
            </Avatar>
            )
        }
    }

   
    let updatedURL = userArray.map(thisUser => {
        console.log("url " + thisUser.avatar)
        return 'http://127.0.0.1:8000' + thisUser.avatar;
    });
    
    let firstInitial = userArray.map(thisUser => {
        return thisUser.first_name.charAt(0);
    });

    let lastInitial = userArray.map(thisUser => {
        return thisUser.last_name.charAt(0);
    });

    if (userArray.length === 0){
        return (
            <Avatar>
            {first_name.charAt(0) + " " + last_name.charAt(0)}
        </Avatar>
        )
    }
   
    return(
        <Avatar alt="avatar" src={updatedURL}>
            {firstInitial + " " + lastInitial}
        </Avatar>
    )
}

export default CardHeader;