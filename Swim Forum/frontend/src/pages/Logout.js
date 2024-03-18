import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === undefined) {
            navigate('/login');
        }
        else {
            console.log(localStorage.getItem('access_token'))
            logout();
        };
    }, []);

    let logout = async () => {
        try {
            await fetch('http://localhost:8000/api/logout/', {
                method: 'POST',
                refresh_token: localStorage.getItem('refresh_token'),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            localStorage.clear();
            axios.defaults.headers.common['Authorization'] = null;
            // alert("logout success")
            navigate('/login');
        } catch (e) {
            console.log('logout not working', e)
        }
    }

    return (
        <div>logout</div>
    )
}

export default Logout;