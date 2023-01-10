import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import grassIcon from '../../../assets/images/grass-icon.png';
import plant from '../../../assets/images/plant.png';
import GardenGrid from '../../../components/garden/GardenGrid';
import TwoColumnPage from '../../../components/layout/TwoColumnPage';
import { Loader } from '../../../components/loader/FullScreenLoader';
import NavTitle from '../../../components/navigation/NavTitle';
import SlidingPage from '../../../components/SlidingPage';
import { getGarden } from '../../../lib/gardens';
import { getPlots } from '../../../lib/plots';
import { getProfile } from '../../../lib/profile';

export default function Garden() {
  const { gardenId } = useParams();
  const [selectedUnit, setSelectedUnit] = useState(null);

  const [open, setOpen] = useState(false);
  const [plots, setPlots] = useState([]);

  const { isLoading: plotsIsLoading } = getPlots(gardenId, setPlots);

  const garden = getGarden(gardenId);
  const profile = getProfile();

  const isDisabled = (cell) => !cell.plot;

  const className = (cell) => (cell.plot ? 'bg-yellow-700' : 'bg-green-500');

  const getImage = (cell) => {
    if (cell?.plot?.plant) {
      return cell.plot.plant.image;
    }
    return cell.plot ? plant : grassIcon;
  };

  const handleCaseClick = (cell) => {
    if (cell.plot) {
      setSelectedUnit(cell.plot);
      setOpen(true);
    }
  };

  return !plotsIsLoading && !garden.isLoading && !profile.isLoading ? (
    <>
      {selectedUnit != null && <SlidingPage open={open} setOpen={setOpen} selectedUnit={selectedUnit} />}

      <TwoColumnPage title="Visualisation de votre jardin" subtitle="Editez, visualisez les taches et les plantations">
        {/* primary column */}
        {plots.length > 0 ? (
          <GardenGrid
            className={className}
            plots={plots}
            isDisabled={isDisabled}
            getImage={getImage}
            handleCaseClick={handleCaseClick}
          />
        ) : profile.data.id === garden.data.manager ? (
          <div className="flex flex-col items-center justify-center h-96 lg:w-1/2 mx-auto text-center">
            <p className="text-2xl text-gray-500">Vous n'avez pas encore de parcelles</p>
            <p className="text-sm text-gray-500 mb-3">Ajoutez des parcelles pour pouvoir visualiser votre jardin</p>
            <Link
              to={`/app/dashboard/${gardenId}/modeling`}
              relative="path"
              className="inline-flex items-center justify-center rounded-md border border-transparent w-full bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none"
            >
              Modelisation
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 lg:w-1/2 mx-auto text-center">
            <p className="text-2xl text-gray-500">Le jardin n'a pas encore été modelisé</p>
            <p className="text-sm text-gray-500 mb-3">Le jardin n'a pas encore été modelisé par son manager</p>
          </div>
        )}

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

          <NavTitle title="Invitations" />

          {/* inviter des amis à rejoindre en donnant l'id du jardin */}
          <div className="flex flex-col items-center justify-center mx-auto text-center">

            <p className="m-2 text-sm text-gray-500">
              Invitez des amis à rejoindre votre jardin en leur donnant ce code :
            </p>
            <p className="m-2 text-base text-gray-600">{garden.data.id}</p>
          </div>

          {plots.length > 0 && (<>
            <NavTitle title="Arrosage du jardin" />

            <div className="flex flex-col items-center justify-center mx-auto text-center">
              <p className="m-2 text-sm text-gray-500">Comment arroser de manière optimale votre jardin ?</p>
              <Link
                to={`/app/dashboard/${gardenId}/watering`}
                relative="path"
                className="inline-flex items-center justify-center rounded-md border border-transparent w-full bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none"
              >
                Arrosage
              </Link>
            </div>
          </>
          )}





          {profile.data.id === garden.data.manager && (
            <>
              <NavTitle title="Modelisation" />

              <p className="m-2 text-sm text-gray-500">Editez les parcelles du jardin</p>
              <Link
                to={`/app/dashboard/${gardenId}/modeling`}
                relative="path"
                className="inline-flex items-center justify-center rounded-md border border-transparent w-full bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none"
              >
                Modelisation
              </Link>
            </>
          )}
        </div>
      </TwoColumnPage>
    </>
  ) : (
    <Loader />
  );
}
