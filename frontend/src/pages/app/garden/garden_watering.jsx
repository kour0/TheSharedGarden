import { Link, useParams } from "react-router-dom";
import GardenGrid from "../../../components/garden/GardenGrid";
import TwoColumnPage from "../../../components/layout/TwoColumnPage";
import { getPlots, getWaterUnits } from "../../../lib/plots";
import grassIcon from '../../../assets/images/grass-icon.png';
import plant from '../../../assets/images/plant.png';
import { Loader } from "../../../components/loader/FullScreenLoader";
import { useState } from "react";
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import NavTitle from "../../../components/navigation/NavTitle";


export default function GardenWatering() {

    const { gardenId } = useParams();

    const [plots, setPlots] = useState([]);

    const { isLoading: waterUnitsLoading, data: waterUnits } = getWaterUnits(gardenId);
    const { isLoading: plotsIsLoading } = getPlots(gardenId, setPlots);


    const isDisabled = (cell) => !cell.plot;

    const className = (cell) => (cell.water ? 'bg-blue-500' : cell.plot ? 'bg-yellow-700' : 'bg-green-500');

    const getImage = (cell) => {
        if (cell?.plot?.plant) {
            return cell.plot.plant.image;
        }
        return cell.plot ? plant : grassIcon;
    };

    return !waterUnitsLoading && !plotsIsLoading ? (
        <TwoColumnPage title="Arrosage" subtitle="Arroser efficacement votres jardins">
            {/* primary column */}

            <GardenGrid
                className={className}
                plots={plots}
                isDisabled={isDisabled}
                getImage={getImage}
                watersUnits={waterUnits}

            />


            {/* secondary column */}
            <div>
                <div className="flex items-center mb-4">
                    <Link
                        to={`/app/dashboard/${gardenId}`}
                        relative="path"
                        className="flex items-center text-sm font-medium text-teal-700 hover:text-teal-800"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                        Retour au jardin
                    </Link>
                </div>

                <NavTitle title="Unités à arroser" />

                <p className="m-2 text-sm text-gray-500">Les unités suivantes ont besoin d'être arrosées</p>

                {waterUnits.length > 0 ? (
                    <ul className="grid grid-cols-1 gap-3 list-none">
                        {waterUnits.map((unit, index) => (
                            <li key={index} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                                <div className="w-full p-4">
                                    <p className="mt-1 truncate text-sm text-gray-900">Coordonnées : x: {unit.x} y: {unit.y}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="my-10">
                        <p className="text-sm text-gray-500">Aucune unité à arroser</p>
                    </div>
                )}
            </div>

        </TwoColumnPage>
    ) : (
        <Loader />
    );


}