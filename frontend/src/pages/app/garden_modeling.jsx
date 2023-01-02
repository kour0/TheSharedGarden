import { useParams } from 'react-router-dom';
import { createPlot, deletePlot, editPlot, getGarden, getPlots, updateNamePlot } from '../../lib/gardens';
import { Loader } from '../../components/loader/FullScreenLoader';
import { useMemo, useState } from 'react';
import {
  CheckIcon,
  PencilSquareIcon,
  PlusIcon,
  PlusIcon as PlusIconOutline,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { classNames } from '../../utils/helpers';
import { useQueryClient } from '@tanstack/react-query';

import grassIcon from '../../assets/images/grass-icon.png';
import plant from '../../assets/images/plant.png';
import TwoColumnPage from '../../components/layout/TwoColumnPage';
import GardenGrid from '../../components/garden/GardenGrid';

export default function GardenModeling() {
  const { gardenId } = useParams();
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState([]);
  const [modelingState, setModelingState] = useState(false);
  const [editingPlot, setEditingPlot] = useState(null);

  const [plots, setPlots] = useState([]);

  const gridSize = 12
  const {
    isLoading: plotsIsLoading,
    isError: plotsIsError,
    data: plotsData,
    error: plotsError,
  } = getPlots(gardenId, setPlots);


  const isBeside = (cell) => {
    const index = cell.index;
    return (
      selected.length == 0 ||
      selected.includes(index) ||
      (selected.includes(index - 1) && cell.y != 0) ||
      (selected.includes(index + 1) && cell.y != gridSize - 1) ||
      (selected.includes(index - gridSize) && cell.x != 0) ||
      (selected.includes(index + gridSize) && cell.x != gridSize - 1)
    );
  };

  const unitIsClaimed = (cell) => cell.plot != null && cell.plot !== editingPlot;

  const cellIsSelected = (cell) => selected.includes(cell.index);

  const isDisabled = (cell) => unitIsClaimed(cell) || !isBeside(cell) || !modelingState;

  const className = (cell) => cellIsSelected(cell)
    ? 'bg-teal-700'
    : unitIsClaimed(cell)
      ? 'bg-yellow-700'
      : !modelingState || !isBeside(cell)
        ? 'bg-green-400' : 'bg-green-200';

  const getImage = (cell) => (cellIsSelected(cell) || unitIsClaimed(cell)) ? plant : (!modelingState || !isBeside(cell)) ? grassIcon : null;


  const postCreatePlot = createPlot(gardenId, queryClient);
  const postUpdatePlot = editPlot(gardenId, queryClient);
  const postDeletePlot = deletePlot(gardenId, queryClient);
  const postUpdateNamePlot = updateNamePlot(gardenId, queryClient);

  const handleAddPlot = (cell) => {
    const index = cell.index;
    if (selected.includes(index)) {
      setSelected(selected.filter((item) => item !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const handleAddPlotSubmit = () => {
    if (editingPlot != null) {
      postUpdatePlot.mutate({ ...editingPlot, units: selected });
      setEditingPlot(null);
    } else {
      postCreatePlot.mutate(selected);
    }
    setModelingState(false);
    setSelected([]);
  };

  const handleAddPlotCancel = () => {
    setModelingState(false);
    setSelected([]);
    if (editingPlot != null) {
      setEditingPlot(null);
    }
  };

  const handleEditPlot = (plotIndex) => {
    setEditingPlot(plots[plotIndex]);
    setSelected(plots[plotIndex].units);
    setModelingState(true);
  };

  const handleDeletePlot = (plotIndex) => {
    postDeletePlot.mutate(plots[plotIndex].plot_id);
  };

  const handleUpdateNamePlot = (index) => {
    postUpdateNamePlot.mutate(plots[index]);
  };

  const handleChangeNamePlot = (event, index) => {
    plots[index].plot_name = event.target.value;
    setPlots([...plots]);
  };


  return !plotsIsLoading ? (

    <TwoColumnPage title="Modélisation de votre jardin" subtitle="Les jardins auquels vous participez.">

      {/* primary column */}
      <GardenGrid className={className} plots={plots} isDisabled={isDisabled} getImage={getImage} handleCaseClick={handleAddPlot} />

      {/* secondary column */}
      <div>

        {!modelingState ? (
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent w-full bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none"
            onClick={() => setModelingState(true)}
          >
            Ajouter une parcelle
            <PlusIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </button>
        ) : (
          <>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent w-full mb-2 bg-gray-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none"
              onClick={handleAddPlotCancel}
            >
              Annuler
              <XMarkIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent w-full bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none"
              onClick={handleAddPlotSubmit}
            >
              Valider la parcelle
              <CheckIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}

        <div className="relative mt-5">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-lg font-medium text-gray-900">Parcelles</span>
          </div>
        </div>

        <p className="m-2 text-sm text-gray-500">Les parcelles que vous avez définies.</p>

        {plots.length > 0 ? (
          <ul role="list" className="grid grid-cols-1 gap-3 list-none">
            {plots.map((plot, index) => (
              <li key={plot.plot_id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                <div className="w-full p-4">
                  <div className='mb-2'>
                    <label htmlFor="name" className="sr-only">
                      Name
                    </label>
                    <div className="flex rounded-md shadow-sm">
                      <input
                        type="name"
                        name="name"
                        id="name"
                        className="block w-full rounded-none rounded-l-md border-gray-300 pl-2 shadow-sm sm:text-sm"
                        defaultValue={plot.plot_name || 'Parcelle' + index}
                        onChange={(e) => handleChangeNamePlot(e, index)} />
                      <button
                        type="button"
                        className="relative rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 hover:bg-gray-100 "
                        onClick={() => handleUpdateNamePlot(index)}
                      >
                        Valider
                      </button>
                    </div>
                  </div>

                  <p className="mt-1 truncate text-sm text-gray-500">{plot.units.length} unités </p>
                </div>

                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => handleEditPlot(index)}
                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                      >
                        <PencilSquareIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-3">Modifier</span>
                      </button>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => handleDeletePlot(index)}
                        className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                      >
                        <TrashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-3">Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="my-10">
            <p className="text-sm text-gray-500">Vous n'avez pas encore défini de parcelle.</p>
          </div>
        )}
      </div>
    </TwoColumnPage >
  ) : (
    <Loader />
  );
}
