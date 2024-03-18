import React, { useState, useEffect } from 'react';


const GetName = (props) => {
    let userID = props.id;
    let intials = props.intials;

    console.log("id: " + userID)

    let [user, setUser] = useState([]);

    useEffect(() => {
        getUser();
    }, []);

    let getUser = async () => {
        try {
            let url = 'http://127.0.0.1:8000/api/users/' + userID;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });
            let data = await response.json()
            setUser(data)
        } catch (error) {
            console.log('There was an error', error);
        }
    }

    let firstInitial = user.map(thisUser => {
        return thisUser.first_name;
    });

    let lastInitial = user.map(thisUser => {
        return thisUser.last_name;
    });
    
    return (
        firstInitial + " " + lastInitial
    )
}

export default GetName;


