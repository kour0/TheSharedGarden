import { useParams } from "react-router-dom";
import GardenGrid from "../../../components/garden/GardenGrid";
import TwoColumnPage from "../../../components/layout/TwoColumnPage";
import { getPlots, getWaterUnits } from "../../../lib/plots";
import grassIcon from '../../../assets/images/grass-icon.png';
import plant from '../../../assets/images/plant.png';
import { Loader } from "../../../components/loader/FullScreenLoader";
import { useState } from "react";

export default function GardenWatering() {

    const { gardenId } = useParams();

    const [plots, setPlots] = useState([]);
    
    const { isLoading: waterUnitsLoading, data: waterUnits } = getWaterUnits(gardenId);
    const { isLoading : plotsIsLoading} = getPlots(gardenId, setPlots);


    const isDisabled = (cell) => !cell.plot;

    const className = (cell) => ( cell.water ? 'bg-blue-500' :cell.plot ? 'bg-yellow-700' : 'bg-green-500');

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
                {console.log(waterUnits)}
            </div>
        </TwoColumnPage>
    ) : (
        <Loader />
    );


}