
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import grassIcon from '../../../assets/images/grass-icon.png';
import plant from '../../../assets/images/plant.png';
import GardenGrid from '../../../components/garden/GardenGrid';
import TwoColumnPage from '../../../components/layout/TwoColumnPage';
import { Loader } from '../../../components/loader/FullScreenLoader';
import NavTitle from '../../../components/navigation/NavTitle';
import SlidingPage from '../../../components/SlidingPage';
import { getPlots } from '../../../lib/gardens';

export default function Garden() {
  const { gardenId } = useParams();
  const queryClient = useQueryClient();
  const [selectedUnit, setSelectedUnit] = useState({});

  const [open, setOpen] = useState(false);
  const [plots, setPlots] = useState([]);

  const {
    isLoading: plotsIsLoading,
    isError: plotsIsError,
    data: plotsData,
    error: plotsError,
  } = getPlots(gardenId, setPlots);

  const isDisabled = (cell) => !cell.plot;

  const className = (cell) => 'bg-green-700'

  const getImage = (cell) => (cell.plot) ? plant : grassIcon;

  const handleCaseClick = (cell) => {
    if (cell.plot) {
      setSelectedUnit(cell.plot);
      setOpen(true);
    }
  };

  return !plotsIsLoading ? (
    <>
      <SlidingPage open={open} setOpen={setOpen} selectedUnit={selectedUnit}/>

      <TwoColumnPage title="Visualisation de votre jardin" subtitle="Editez, visualisez les taches et les plantations">

        {/* primary column */}
        <GardenGrid className={className} plots={plots} isDisabled={isDisabled} getImage={getImage} handleCaseClick={handleCaseClick} />

        {/* secondary column */}
        <div>

          <NavTitle title="Informations" />
          <p className="m-2 text-sm text-gray-500">Voir les informations du jardin</p>
          <Link
            to={`/app/dashboard/${gardenId}/info`}
            relative="path"
            className="inline-flex items-center justify-center rounded-md border border-transparent w-full bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none"
          >
            Informations
          </Link>

          
          <NavTitle title="Modelisation" />

          <p className="m-2 text-sm text-gray-500">Editez les parcelles du jardin</p>
          <Link
            to={`/app/dashboard/${gardenId}/modeling`}
            relative="path"
            className="inline-flex items-center justify-center rounded-md border border-transparent w-full bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none"
          >
            Modelisation
          </Link>
        </div>
      </TwoColumnPage>
    </>
  ) : (
    <Loader />
  );

}


