import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
    return (
      <header>
        <div className="logo">
          <h1>
            <Link to="/">YajiShop</Link>
          </h1>
        </div>

        <ul>
          <li>
            <Link to="/">
              <i className="fas fa-shopping-cart"></i> Cart
            </Link>
          </li>

          <li>
            <Link to="/login">
              <i className="fas fa-user"></i> Sign In
            </Link>
          </li>
        </ul>
      </header>
    );
}

export default Header

