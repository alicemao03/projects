
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const CreateAccount = () => {
    const navigate = useNavigate();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [img_src, setAvatar] = useState("");


    let addUser = async () => {
        if (first_name !== "" && last_name !== "" && email !== "" && username !== "" && password !== "") {
            try {
                let url = 'http://127.0.0.1:8000/api/users/createUser';

                const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        username: username,
                        password: password,
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });


                if (img_src !== "") {
                    addAvatar();
                }
                getToken();
                navigate('/login');

            } catch (error) {
                console.log('There was an error', error);
            }
        }
        else {
            alert("One of more fields have been left empty")
        }
    }

    let addAvatar = async () => {
        try {
            let url = 'http://127.0.0.1:8000/api/users/avatar/' + username;
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    img_src: img_src,
                    username: username,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
        }catch (error) {
            console.log('There was an error', error);
        }
    }

    function getToken() {
        console.log("token: " + username)
        let verifyUser = async () => {
            try {
                const { data } = await axios.post('http://localhost:8000/token/',
                    JSON.stringify({
                        username: username,
                        password: password,
                    }), {
                    headers:
                        { 'Content-Type': 'application/json' }
                }, {
                    withCredentials: true
                });
                console.log("made asdfsdf it")
                localStorage.clear();
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`; // Carried on throughout
                parseJwt(localStorage.getItem('access_token'))
            } catch (error) {
                console.log('There was an error', error);
            }
        }
    }
    // https://stackoverflow.com/questions/54036341/how-to-get-user-information-from-jwt-cookie-in-nextjs-reactjs
    function parseJwt(token) {
        console.log("asdfasdf2e134 : " + token)
        if (!token) { return; }
        const decoded = jwt_decode(token);
        localStorage.setItem('current_user', decoded.user_id);
        console.log('decode : ' + localStorage.getItem('current_user'));
        navigate('/onTheRoof')
    }

    return (
        <div className="Auth-form-container">
            <div className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Create an Account</h3>
                    <div className="form-group mt-3">
                        <label>First name</label>
                        <input
                            type="text"
                            value={first_name}
                            className="form-control mt-1"
                            placeholder="First name"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Last name</label>
                        <input
                            type="text"
                            value={last_name}
                            className="form-control mt-1"
                            placeholder="Last name"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            className="form-control mt-1"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            className="form-control mt-1"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            className="form-control mt-1"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Add avatar</label>
                        <input
                            type="file"
                            value={img_src}
                            className="mt-1"
                            placeholder="add avatar"
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary submitBtn" onClick={addUser}>
                            Create Account!
                        </button>
                    </div>
                    <p className="forgot-password mt-2">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount;
