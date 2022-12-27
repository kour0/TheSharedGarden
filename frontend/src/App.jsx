import { Route, Routes, useNavigate } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/login';
import Dashboard from './pages/app/dashboard';
import { CreateGarden } from './pages/app/createGarden';
import JoinGarden from './pages/app/joinGarden';
import SideBar from './components/layout/SideBar';
import Cookies from 'js-cookie';
import Error404 from './components/Error404';
import Profile from './pages/app/profile';
import SearchGarden from './pages/app/searchGarden';
import Garden from './pages/app/garden';
import GardenModeling from './pages/app/garden_modeling';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />

        <Route path="/app" element={<SideBar />}>
          <Route path="create-garden" element={<CreateGarden />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="dashboard/:gardenId">
            <Route index element={<Garden />} />
            <Route path="modeling" element={<GardenModeling />} />
          </Route>

          <Route path="join-garden">
            <Route index element={<JoinGarden />} />
            <Route path="join-garden/:gardenName" element={<SearchGarden />} />
          </Route>
          
          <Route path="profile" element={<Profile />} />

        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
