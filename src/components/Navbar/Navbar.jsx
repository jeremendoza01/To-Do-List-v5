import { useState } from 'react';
import { Link } from "react-router-dom"
import { HiMenu } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";

import "../styles/styles-navbar.css"

function Navbar() {

    const [isSidebarOpen, setisSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setisSidebarOpen(!isSidebarOpen)
    }

    return (
        <>
            <header className="App-header">
                <div className="div-header">
                    <HiMenu className='icon-navbar' onClick={toggleSidebar} />
                    <h1 className='logo-navbar'>VIEW NAME</h1>
                </div>
            </header>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className='div-logo-sidebar'>
                    <h1>VIEW NAME</h1>
                    <HiOutlineX className='close-btn' onClick={toggleSidebar} />
                </div>
                <nav className='nav-sidebar'>
                    <div>
                        <ul className='lista-navbar'>
                            <Link to={"/home"} className='text-lista' >Home</Link>
                            <Link to={"/my-projects"} className='text-lista' >My Proyects</Link>
                            <Link to={"/my-stories"} className='text-lista'>My Stories</Link>
                        </ul>
                    </div>
                </nav>
                <div className='div-user'>
                    <Link to={"/settings"} className='text-lista' >Settings</Link>
                </div>
            </div>
        </>

    );
}
export default Navbar