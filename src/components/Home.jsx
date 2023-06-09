import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home-page'>
        <div className="home jumbotron centered" style={{backgroundColor:  "#ffffff00", textAlign: "center", fontFamily: "Montserrat, sans-serif"}}>
            <div className="container">
                <i className="fas fa-key fa-6x" />
                <h1 className="display-3">Welcome to Keeper</h1>
                <p className="lead">Don't keep your secrets, share them anonymously!</p>
                <hr />
                <Link className="btn btn-light btn-lg" to="/register" role="button">Register</Link>
                <Link className="btn btn-dark btn-lg" to="/login" role="button">Login</Link>

            </div>
        </div>
    </div>
  )
}



export default Home