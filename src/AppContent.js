import React , {useState , useEffect} from "react";
import {  Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./Route/ProtectedRoute";
import Sidebar from "./Layout/Sidebar/Sidebar";
import Header from "./Layout/Header/Header";
import Login from "./Auth/Login";
import Role from "./Component/Role/Role";
import AddRole from "./Component/Role/AddRole";
import EditRole from "./Component/Role/EditRole";
import Permission from "./Component/Role/Permission";
import Admins from "./Component/Admins/Admin";
import AddAdmin from "./Component/Admins/AddAdmin";
import EditAdmin from "./Component/Admins/EditAdmin";
import Dashboard from "./Component/Dashboard/Dashboard";

import NotAuthorized from "./Component/NotAuthorized";


import Products from "./Component/Products/Products";
import AddProduct from "./Component/Products/AddProduct";
import EditProduct from "./Component/Products/EditProduct"

import Categories from "./Component/Categories/Categories";
import AddCategory from "./Component/Categories/AddCategory";
import EditCategory from "./Component/Categories/EditCategory"

import Sizes from "./Component/Sizes/Sizes";
import AddSize from "./Component/Sizes/AddSize";
import EditSize from "./Component/Sizes/EditSize"

import Setting from "./Component/Settings/Settings";
import Orders from "./Component/Orders/Orders";

function AppContent () {

    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleResize = () => {
        if (window.innerWidth < 968) { 
            setIsSidebarOpen(false);

        }

    };

    useEffect(() => {
       
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return(<>

        {!isLoginPage &&  <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
        <main className="content">
          {!isLoginPage &&  <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/"
                element={
                <ProtectedRoute requiredPermission="admin.get">
                    <Dashboard/>
                </ProtectedRoute>
                }
            />
            
            <Route
                path="/dashboard"
                element={
                <ProtectedRoute requiredPermission="admin.get">
                    <Dashboard/>
                </ProtectedRoute>
                }
            />
            <Route
                path="/not-authorized"
                element={<NotAuthorized />}
            />
            <Route
                path="/Role"
                element={
                <ProtectedRoute requiredPermission="role.get">
                    <Role />
                </ProtectedRoute>
                }
            />
            <Route
                path="/AddRole"
                element={
                <ProtectedRoute requiredPermission="role.add">
                    <AddRole />
                </ProtectedRoute>
                }
            />
            <Route
                path="/EditRole/:roleid"
                element={
                <ProtectedRoute requiredPermission="role.edit">
                    <EditRole />
                </ProtectedRoute>
                }
            />
            <Route
                path="/Permission/:permissionname/:permissionid"
                element={
                <ProtectedRoute requiredPermission="permission.get">
                    <Permission />
                </ProtectedRoute>
                }
            />
      
             <Route
                path="/admins"
                element={
                <ProtectedRoute requiredPermission="admin.get">
                    <Admins />
                </ProtectedRoute>
                }
            />
             <Route
                path="/AddAdmin"
                element={
                <ProtectedRoute requiredPermission="admin.add">
                    <AddAdmin />
                </ProtectedRoute>
                }
            />
             <Route
                path="/EditAdmin/:adminid"
                element={
                <ProtectedRoute requiredPermission="admin.edit">
                    <EditAdmin />
                </ProtectedRoute>
                }
            />
             <Route
                path="/Orders"
                element={
                <ProtectedRoute requiredPermission="order.get">
                    <Orders />
                </ProtectedRoute>
                }
            />
             <Route
                path="/products"
                element={
                <ProtectedRoute requiredPermission="product.get">
                    <Products />
                </ProtectedRoute>
                }
            />
            <Route
                path="/AddProduct"
                element={
                <ProtectedRoute requiredPermission="product.add">
                    <AddProduct />
                </ProtectedRoute>
                }
            />
            
            <Route
                path="/EditProduct/:productid"
                element={
                <ProtectedRoute requiredPermission="product.edit">
                    <EditProduct />
                </ProtectedRoute>
                }
            />


<Route
                path="/categories"
                element={
                <ProtectedRoute requiredPermission="category.get">
                    <Categories />
                </ProtectedRoute>
                }
            />
            <Route
                path="/AddCategory"
                element={
                <ProtectedRoute requiredPermission="category.add">
                    <AddCategory />
                </ProtectedRoute>
                }
            />
            
            <Route
                path="/EditCategory/:catid"
                element={
                <ProtectedRoute requiredPermission="category.edit">
                    <EditCategory />
                </ProtectedRoute>
                }
            />
            
            

<Route
                path="/Settings"
                element={
                <ProtectedRoute requiredPermission="setting.get">
                    <Setting />
                </ProtectedRoute>
                }
            />

<Route
                path="/sizes"
                element={
                <ProtectedRoute requiredPermission="product.get">
                    <Sizes />
                </ProtectedRoute>
                }
            />
            <Route
                path="/AddSize"
                element={
                <ProtectedRoute requiredPermission="product.add">
                    <AddSize />
                </ProtectedRoute>
                }
            />
            
            <Route
                path="/EditSize/:sizeid"
                element={
                <ProtectedRoute requiredPermission="product.edit">
                    <EditSize />
                </ProtectedRoute>
                }
            />
          </Routes>
        </main>

    </>)
}
export default AppContent