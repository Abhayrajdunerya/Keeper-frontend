import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

// const host = "http://localhost:8000/api";
// const host = "https://keper-backend.onrender.com/api";
// const host = process.env.REACT_APP_API;
const host = import.meta.env.VITE_API;

const Login = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  
  const handleChange = (event) => {
    const {name, value} = event.target;

    setUser( prevValue => {
        return {
            ...prevValue,
            [name]: value
        }
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${host}/user/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'email': user.email,
        'password': user.password
      })
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate('/notes');
    } else {
      alert("Please try to login with correct Credentials");
    }
  }


  return (
    <div>
      <div className='login'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 form-div">
                    <input onChange={handleChange} name="email" value={user.username} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email address' minLength={3} required />
                </div>
                <div className="mb-3 form-div">
                    <input onChange={handleChange} name="password" value={user.password} type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' minLength={5} required />
                </div>
                <button type="submit" style={{color: 'white'}}><LoginIcon /></button>
            </form>
        </div>
    </div>
  )
}

export default Login;