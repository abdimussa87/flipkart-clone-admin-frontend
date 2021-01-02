import React from 'react'
import './Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSidebarOption } from './features/appSlice';

function Sidebar() {
    const dispatch = useDispatch();
    const selectedOption = useSelector(state => state.app.selectedSidebarOption);
    const handleClick = (option) => {
        dispatch(setSelectedSidebarOption(option));
    }
    return (
        <div className='sidebar'>
            <h4 className={`sidebar__option ${selectedOption === 'home' ? "active" : ''}`} onClick={() => handleClick('home')}>Home</h4>
            <h4 className={`sidebar__option ${selectedOption === 'category' ? "active" : ''}`} onClick={() => handleClick('category')}>Category</h4>
            <h4 className={`sidebar__option ${selectedOption === 'products' ? "active" : ''}`} onClick={() => handleClick('products')}>Products</h4>
            <h4 className={`sidebar__option ${selectedOption === 'page' ? "active" : ''}`} onClick={() => handleClick('page')}>Page</h4>
            <h4 className={`sidebar__option ${selectedOption === 'orders' ? "active" : ''}`} onClick={() => handleClick('orders')}>Orders</h4>

        </div>
    )
}

export default Sidebar
