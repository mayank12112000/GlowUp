import Sidebar from '../components/Sidebar';
import './App.css'
import { useState } from 'react';

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle function for sidebar
  const onSetSidebarOpen = (open) => {
    setSidebarOpen(open);
  };

  return (
    <>
    <Sidebar/>
    </>
  );
};

export default App;