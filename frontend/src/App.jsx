import { Route, Routes } from 'react-router-dom';
import Error404 from './components/Error404';
import SideBar from './components/layout/SideBar';
import { CreateGarden } from './pages/app/createGarden';
import Dashboard from './pages/app/dashboard';
import Garden from './pages/app/garden/garden';
import GardenInfo from './pages/app/garden/garden_info';
import GardenModeling from './pages/app/garden/garden_modeling';
import GardenWatering from './pages/app/garden/garden_watering';
import JoinGarden from './pages/app/joinGarden';
import Profile from './pages/app/profile';
import SearchGarden from './pages/app/searchGarden';
import Index from './pages/Index';
import Login from './pages/login';

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
            <Route path="info" element={<GardenInfo />} />
            <Route path="watering" element={<GardenWatering />} />
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
