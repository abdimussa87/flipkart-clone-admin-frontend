import React from 'react'
import './Admin.css'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux';
import Orders from './Orders';
import Products from './Products';
import Category from './Category';
import Page from './Page';
function Admin() {
    const selectedSidebarOption = useSelector(state => state.app.selectedSidebarOption);

    const renderBody = (param) => {
        switch (param) {
            case 'home':
                return <div>
                    <h3>Welcome to Admin Dashboard</h3>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi accusantium aut esse temporibus ex ducimus reiciendis, aperiam quisquam error sequi. Assumenda animi culpa harum laboriosam iusto beatae libero aut facilis.;
                 </div>;
            case 'category':
                return <Category />
            case 'products':
                return <Products />;
            case 'page':
                return <Page />;
            case 'orders':
                return <Orders />
            default:
                <div>
                    <h3>Welcome to Admin Dashboard</h3>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi accusantium aut esse temporibus ex ducimus reiciendis, aperiam quisquam error sequi. Assumenda animi culpa harum laboriosam iusto beatae libero aut facilis.;
                 </div>;
        }
    }

    return (
        <div className='admin' >
            <Sidebar />
            <div className="admin__body">
                {
                    renderBody(selectedSidebarOption)
                }

            </div>
        </div>
    )
}

export default Admin
