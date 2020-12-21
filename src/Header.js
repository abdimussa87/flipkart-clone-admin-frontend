import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSelectedSidebarOption } from './features/appSlice'
import { logout } from './features/userSlice'
import './Header.css'
function Header() {
    const authenticated = useSelector(state => state.user.authenticated)

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <div className='header'>
            <Link to='/'>
                <h4 className='header__logo' onClick={() => dispatch(setSelectedSidebarOption('home'))}>Admin Dashboard</h4>
            </Link>
            <div className="header__headerRight">
                {!authenticated ?
                    <>
                        <Link to='/signin'>
                            <h5 className='header__headerOption'>Sign In</h5>
                        </Link>
                        <Link to='/signup'>
                            <h5 className="header__headerOption">Sign Up</h5>
                        </Link>
                    </>
                    : <>
                        <Link to='/signin'>
                            <h5 className='header__headerOption' onClick={handleLogout}>Sign Out</h5>
                        </Link>
                    </>

                }
            </div>
        </div>
    )
}

export default Header
