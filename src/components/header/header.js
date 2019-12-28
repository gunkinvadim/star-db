import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

const Header = ({ onServiceChange, onLogin, onExit, isLoggedIn }) => {
  return (
    <div className="header d-flex">
      <h3>
        <Link to="/">
          StarDB
        </Link>
      </h3>
      <ul className="d-flex">
        <li>
          <Link to="/people/">People</Link>
        </li>
        <li>
          <Link to="/planets/">Planets</Link>
        </li>
        <li>
          <Link to="/starships/">Starships</Link>
        </li>
        <li>
          <Link to="/secret">Secret</Link>
        </li>
        { isLoggedIn ? (
            <li>
              <Link
                to="/"
                onClick={onExit}
              >Exit</Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )
        }
      </ul>

      <button
        className="btn btn-primary bnt-sm"
        onClick={onServiceChange}
      >
        Change Service
      </button>
    </div>
  );
};

export default Header;