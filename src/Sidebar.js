import React from 'react'
import './Sidebar.css';
import { useDispatch } from 'react-redux';
import { setSelectedSidebarOption } from './features/appSlice';

function Sidebar() {
    const dispatch = useDispatch();

    const handleClick = (option) => {
        dispatch(setSelectedSidebarOption(option));
    }
    return (
        <div className='sidebar'>
            <h4 className='sidebar__option' onClick={() => handleClick('home')}>Home</h4>
            <h4 className='sidebar__option' onClick={() => handleClick('products')}>Products</h4>
            <h4 className='sidebar__option' onClick={() => handleClick('orders')}>Orders</h4>

        </div>
    )
}

export default Sidebar
