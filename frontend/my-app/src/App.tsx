import { useState } from 'react';
import viteLogo from '/vite.svg';
import './App.css';
import { Button } from '@mui/material';
import { AccessAlarm, AddShoppingCart } from '@mui/icons-material';
import Navbar from './Customer/Component/Navbar/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="p-20">
        
        
        <Navbar/>



      </div>
  );
}

export default App;
