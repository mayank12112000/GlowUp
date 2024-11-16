
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
import { useContext } from 'react';
function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`app-body  ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <Sidebar />
      <div className="rest">
        <Routes>
          <Route path='/settings' element={<Settings/>}/>  
          <Route path='/notification' element={<Notification/>}/>  
          <Route path='/profile' element={<Profile/>}/>  
          <Route path='/cart' element={<Cart/>}/>  
          <Route path='/wishlist' element={<Wishlist/>}/>  
          <Route path='/calender' element={<Calender/>}/>  
          <Route path='/orders' element={<Orders/>}/>  
          <Route path='/' element={<Homepage/>}/>  
          <Route path='*' element={<NotFound/>}/>  
        </Routes>  
      </div>
    </div>
  );
}

export default App;
