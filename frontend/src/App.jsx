import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/login';
import Register from './pages/register';

function App() {

  
  return (
    <>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
