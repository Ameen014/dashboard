    import React, { useState, useEffect } from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import logo from "../../assets/logo.jpg";
    import GridViewIcon from '@mui/icons-material/GridView';
    import PersonIcon from '@mui/icons-material/Person';
    import LockIcon from '@mui/icons-material/Lock';
    import CloseIcon from '@mui/icons-material/Close';
    import EventNoteIcon from '@mui/icons-material/EventNote';
    import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
    import CategoryIcon from '@mui/icons-material/Category';
    import SettingsIcon from '@mui/icons-material/Settings';
    import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
    import AspectRatioIcon from '@mui/icons-material/AspectRatio';

    const Sidebar = ({ isOpen , toggleSidebar }) => {

        const location = useLocation();
        const isLoginPage = (location.pathname === "/login");
        const [activeItem, setActiveItem] = useState(location.pathname);
        const user = JSON.parse(localStorage.getItem("user"))
        const permissions = user?.permission


        useEffect(() => {
            const menuElement = document.querySelector('.menu');

            if (window.innerWidth < 968) { 
                menuElement.style.width = '96%'
            }
            else{
                menuElement.style.width = '207px'
            }

        }, [isOpen ,location.pathname]);

        useEffect(() => {
            const contentElement = document.querySelector('.content');

            if (isOpen && !isLoginPage && window.innerWidth > 500) {
                contentElement.style.paddingLeft = '225px';
            } else {
                contentElement.style.paddingLeft = '0';
            }

            setActiveItem(location.pathname);

        }, [isOpen ,location.pathname]);


    const menuItems = [
            { path: '/dashboard', label: 'Dashboard', icon: <GridViewIcon className='icon' sx={{ fontSize: "22px", marginRight: "9px" }} />, permission: 'admin.get' },
            { path: '/admins', label: 'Admins', icon: <AdminPanelSettingsIcon className='icon' sx={{ fontSize: "22px", marginRight: "9px" }} />, permission: 'admin.get' },
            { path: '/Settings', label: 'Settings', icon: <SettingsIcon className='icon' sx={{ fontSize: "22px", marginRight: "9px" }} />, permission: 'setting.get' },
            { path: '/Role', label: 'Roles', icon: <LockIcon className='icon' sx={{ fontSize: "22px", marginRight: "9px" }} />, permission: 'role.get' },
            { path: '/products', label: 'Products', icon: <ProductionQuantityLimitsIcon className='icon' sx={{ fontSize: "22px", marginRight: "9px" }} />, permission: 'product.get' },
            { path: '/categories', label: 'Categories', icon: <CategoryIcon className='icon' sx={{ fontSize: "22px", marginRight: "9px" }} />, permission: 'category.get' },
            { path: '/sizes', label: 'Sizes', icon: <AspectRatioIcon className='icon' sx={{ fontSize: "22px", marginRight: "9px" }} />, permission: 'setting.get' },
    ];
    

      const filteredMenuItems = menuItems.filter(item => permissions?.includes(item.permission));


        return (
            <>

                <div className={`menu ${isOpen ? '' : 'hidden'}`}>
                    {isOpen ?
                        <button onClick={toggleSidebar} className="toggle-button-open">
                            <CloseIcon  className="spin-icon" sx={{ color: "black !important" , fontSize:"25px" }} />
                        </button> : ""
                    }
                    <div className='logo'>
                        <h3 style={{color:"14213D",fontSize:"25px",fontWight:"700",letterSpacing:"1.8px"}}>Hand Stone</h3>
                    </div>
                    <div className='menu--list'>
                        {filteredMenuItems.map(item => (
                            <Link key={item.path} to={item.path} className={`item ${activeItem === item.path ? 'active' : ''}`}>
                                <span onClick={toggleSidebar}>
                                    {item.icon}
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </>
        );
    };

    export default Sidebar;
