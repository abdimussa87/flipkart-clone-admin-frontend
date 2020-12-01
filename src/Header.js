import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
function Header() {
    return (
        <div className='header'>
            <Link to='/'>
                <h4 className='header__logo'>Admin Dashboard</h4>
            </Link>
            <div className="header__headerRight">
                <Link to='/signin'>
                    <h5 className='header__headerOption'>Sign In</h5>
                </Link>
                <Link to='/signup'>
                    <h5 className="header__headerOption">Sign Up</h5>
                </Link>
            </div>
        </div>
    )
}

export default Header
