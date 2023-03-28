
import './App.css';

import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import { SignUp } from './components/SignUp';
import { Login } from './components/Login';

function App() {
  return (
   <>
   <BrowserRouter>
        <Routes>
        
          <Route path="/" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          
        
         
        </Routes>
      </BrowserRouter>
   
   </>
  );
}

export default App;
