import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import HighlightIcon from '@mui/icons-material/Highlight';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/notes')
    } else {
      navigate('/');
    }
  }, [])


  const handleClick = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <header>
      <h1><HighlightIcon />Keeper</h1>
      { localStorage.getItem('token') ? <div onClick={handleClick} className="logout" style={{color: 'white'}}><LogoutIcon /></div> : null}
    </header>
  );
}

export default Header;
