import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';

function App() {

  
  return (
    <>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </>
  );
}

export default App;
