import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import HowToRegIcon from '@mui/icons-material/HowToReg';
// import.meta\u200b.env.MODE;
// import.meta.env.VITE_API;

// const host = "http://localhost:8000/api";
// const host = "https://keper-backend.onrender.com/api";
// const host = process.env.process.env.REACT_APP_API;
const host = import.meta.env.VITE_API;

const Register = () => {

  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });
  
  const handleChange = (event) => {
    const {name, value} = event.target;

    setNewUser( prevValue => {
        return {
            ...prevValue,
            [name]: value
        }
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newUser.password === newUser.cpassword) {
      const response = await fetch(`${host}/user/createUser`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'name': newUser.name,
          'email': newUser.email,
          'password': newUser.password
        })
      });
      const json = await response.json();
      // console.log(json);
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        navigate('/notes');
      } else {
        alert("Sorry a user with this email already exists");
      }
    } else {
      alert("Password should be match");
    }
  }


  return (
    <div>
      <div className='login'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 form-div">
                    <input onChange={handleChange} name="name" value={newUser.username} type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder='Name' minLength={3} required />
                </div>
                <div className="mb-3 form-div">
                    <input onChange={handleChange} name="email" value={newUser.username} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder='Email address' minLength={3} required />
                </div>
                <div className="mb-3 form-div">
                    <input onChange={handleChange} name="password" value={newUser.password} type="password" className="form-control" id="password" placeholder='Password' minLength={5} required />
                </div>
                <div className="mb-3 form-div">
                    <input onChange={handleChange} name="cpassword" value={newUser.cpassword} type="password" className="form-control" id="cpassword" placeholder='Confirm Password' minLength={5} required />
                </div>
                <button type="submit" style={{color: 'white'}}><HowToRegIcon /></button>
            </form>
        </div>
    </div>
  )
}

export default Register;