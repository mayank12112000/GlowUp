
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Settings from './pages/Settings';
import Notification from './pages/Notification';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Calender from './pages/Calender';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import Homepage from './pages/Homepage';
import { ThemeContext } from './context/ThemeProvider';
import { useContext, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Role from './pages/Role';
import { AuthContext } from './context/AuthProvider.jsx';
import { Bounce, ToastContainer } from 'react-toastify';
import Clients from './pages/Clients';
import Masters from './pages/Masters.jsx';
function App() {
  const { theme } = useContext(ThemeContext);
  const {userSeq,roleCode} = useContext(AuthContext)
  return (
    <>
      <Navbar/>
    <div className={`app-body  ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <Sidebar />
      <div className="rest">
      <div className="row shadow">
      <div className='container mx-4 mb-7 mt-4'>
      <div className="row shadow page shadow px-4" data-bs-theme={`${theme==="dark"?"dark":"light"}`}>

        <Routes>
          <Route path='/' element={<Homepage/>}/>  
          <Route path='/settings' element={<Settings/>}/>  
          <Route path='/notification' element={<Notification/>}/>  
          <Route path='/cart' element={<Cart/>}/>  
          <Route path='/wishlist' element={<Wishlist/>}/>  
          <Route path='/calender' element={<Calender/>}/>  
          <Route path='/orders' element={<Orders/>}/>  
          <Route path='/signup' element={<Signup/>}/>  
          <Route path='/login' element={<Login/>}/>  
          <Route path='/my-profile' element={<Profile/>}/>  
          <Route path='/clients' element={<Clients/>}/>  
          <Route path='/masters' element={<Masters/>}/>  
          <Route path='*' element={<NotFound/>}/>  
        </Routes> 
        
        <ToastContainer position="top-right" autoClose={800} hideProgressBar={false} newestOnTop={false}
        closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme={theme} transition= {Bounce}/> 
      </div>
      </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default App;
