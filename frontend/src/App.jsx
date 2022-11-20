import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Join from './pages/join';

function App() {

  
  return (
    <>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/join' element={<Join/>}/>
      </Routes>
    </>
  );
}

export default App;
