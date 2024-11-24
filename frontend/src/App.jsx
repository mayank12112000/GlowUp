
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
import RoleMaster from './pages/masters page/Role Master/RoleMaster.jsx';
import NotificaitonMaster from './pages/masters page/NotificationMaster.jsx';
import ProductMaster from './pages/masters page/ProductMaster.jsx';
import ProductTypeMaster from './pages/masters page/ProductTypeMaster.jsx';
import BranchMaster from './pages/masters page/BranchMaster.jsx';
import DiscountPromoMaster from './pages/masters page/DiscountPromoMaster.jsx';
import ServicesMaster from './pages/masters page/ServicesMaster.jsx';
import NoticationMaster from './pages/masters page/NoficationMaster.jsx';
import MastersPage from './pages/masters page/MastersPage.jsx';
import ProtectedAdminRoute from './utils/ProtectedAdminRoute.jsx';
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
      <div className="row page px-2" data-bs-theme={`${theme==="dark"?"dark":"light"}`}>

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
          <Route path='/masters' element={<ProtectedAdminRoute><Masters/></ProtectedAdminRoute>}/>
          <Route path='/masters/role-master/*' element={<ProtectedAdminRoute><RoleMaster/></ProtectedAdminRoute>}/>
          <Route path='/masters/notificaiton-master' element={<NoticationMaster/>}/>
          <Route path='/masters/product-master' element={<ProductMaster/>}/>
          <Route path='/masters/product-type-master' element={<ProductTypeMaster/>}/>
          <Route path='/masters/branch-master' element={<BranchMaster/>}/>
          <Route path='/masters/discount-promo-master' element={<DiscountPromoMaster/>}/>
          <Route path='/masters/sercices-master' element={<ServicesMaster/>}/>
          <Route path='/masters/notification-master' element={<NoticationMaster/>}/>
          <Route path='/masters/:type' element={<MastersPage/>}/>

          <Route path='*' element={<NotFound/>}/>  
        </Routes> 
        
        <ToastContainer limit={1} position="top-right" autoClose={800} hideProgressBar={false} newestOnTop={false}
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
