import { Navigate, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/login';
import Dashboard from './pages/app/dashboard';
import { CreateGarden } from './pages/app/createGarden';
import JoinGarden from './pages/app/joinGarden';
import SideBar from './components/layout/SideBar';
import Error404 from './components/Error404';
import Profile from './pages/app/profile';
import SearchGarden from './pages/app/searchGarden';
import Garden from './pages/app/garden/garden';
import GardenModeling from './pages/app/garden/garden_modeling';
import GardenInfo from './pages/app/garden/garden_info';
import { isLoggedIn } from './lib/permissions';
import { toast } from 'react-hot-toast';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />

        <Route path="/app" element={ isLoggedIn() ? <SideBar /> :  (toast.error('You must be logged in to access this page'), <Navigate to="/login" />) }>
          <Route path="create-garden" element={<CreateGarden />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="dashboard/:gardenId">
            <Route index element={<Garden />} />
            <Route path="modeling" element={<GardenModeling />} />
            <Route path="info" element={<GardenInfo />} />
          </Route>

          <Route path="join-garden">
            <Route index element={<JoinGarden />} />
            <Route path=":gardenName" element={<SearchGarden />} />
          </Route>
          
          <Route path="profile" element={<Profile />} />

        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
