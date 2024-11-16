import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './App.css';
import Role from './pages/Role.jsx';
import { apiRequest } from './utils/apiRequest.js';
import { asyncHandler } from './utils/asyncHandler.js';

function App() {

  return (
    <div className='app-body'>
      <Sidebar />
      <div className="rest container">
        <Role />
      </div>
    </div>
  );
}

export default App;
