import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/login';
import Dashboard from './pages/app/dashboard';
import { CreateGarden } from './pages/app/createGarden';
import JoinGarden from './pages/app/joinGarden';
import { Fragment } from 'react';
import SideBar from './components/layout/SideBar';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/login' element={<Login />} />
        <Route path='/app' element={<SideBar />}>
          <Route path='create-garden' element={<CreateGarden />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='join-garden' element={<JoinGarden />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
