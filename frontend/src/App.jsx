import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/login';
import Dashboard from './pages/app/dashboard';
import { CreateGarden } from './pages/app/createGarden';
import JoinGarden from './pages/app/joinGarden';

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/app/dashboard' element={<Dashboard/>}/>
        <Route path='/app/join-garden' element={<JoinGarden/>}/>
        <Route path='/app/create-garden' element={<CreateGarden/>}/>
      </Routes>
    </>
  );
}

export default App;
