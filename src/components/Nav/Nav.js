import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
      <li>
        <Link to="/landing">
            Landing
          </Link>
        </li>
        <li>
          <Link to="/user">
            User Home
          </Link>
        </li>
        <li>
          <Link to="/info">
            Info Page
          </Link>
        </li>
        <li>
          <Link to="/estimator">
            Estimator Controller
          </Link>
        </li>
        <li>
          <Link to="/accountCreation">
            Create New Admin
          </Link>
        </li>

      </ul>
    </div>
  </div>
);

export default Nav;
