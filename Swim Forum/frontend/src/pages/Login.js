
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

      localStorage.clear();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('authorization_key', `Bearer ${data['access']}`);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`; // Carried on throughout
      parseJwt(localStorage.getItem('access_token'))
    } catch (error) {
      console.log('There was an error', error);
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

  let checkUser = () => {
    if (username !== "" && password !== "") {
      verifyUser();
    }
    else {
      alert("One of more fields have been left empty")
    }
  }

  return (
    <div className="Auth-form-container">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="email"
              value={username}
              className="form-control mt-1"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              value={password}
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary submitBtn" onClick={checkUser}>
              Login
            </button>
          </div>
          <p className="forgot-password mt-2">
            Need an account? <a href="create_account">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;
