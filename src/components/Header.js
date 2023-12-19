import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAuth } from './AuthContext';
import "../css/App.css"

const Header = () => {
    const { state, dispatch } = useAuth();

    const handleLogout = () => {
      // Dispatch the LOGOUT action
      dispatch({ type: 'LOGOUT' });
      // ... other logout logic
    };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);
    switch (option) {
      case 'My Dashboard':
        // Add the logic to navigate to the dashboard
        break;
      case 'View Jobs':
        // Add the logic to navigate to the jobs page
        break;
      case 'View Mentors':
        // Add the logic to navigate to the mentors page
        break;
      case 'Logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const options = ['My Dashboard', 'View Jobs', 'View Mentors', 'Logout'];

  return (
    <header className='Home-header'>
      <div style={{ color: 'white', fontWeight: 'bold' }}>Karcha</div>
      {state.isLoggedIn ? (
        <div style={{ backgroundColor: 'black' }}>
          <IconButton
            aria-label="more"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon style={{ color: 'white', marginTop: '6px' }} />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose('')}
            PaperProps={{
              style: {
                maxHeight: 192,
                width: '20ch',
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => handleClose(option)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      ) : (
        <nav>
          <ul>
            <li style={{ marginRight: '5px', color: 'white', fontWeight: 'bold' }}>
              <Link to="/login"> Login |</Link>
            </li>
            <li style={{ fontWeight: 'bold' }}>
              <Link to="/register"> Register</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
