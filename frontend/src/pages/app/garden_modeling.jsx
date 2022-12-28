import { useParams } from 'react-router-dom';
import { createPlot, deletePlot, editPlot, getGarden, getPlots } from '../../lib/gardens';
import { useDroppable } from '@dnd-kit/core';
import { Loader } from '../../components/loader/FullScreenLoader';
import { useMemo, useState } from 'react';
import { PlusIcon as PlusIconOutline } from '@heroicons/react/24/outline';
import { classNames } from '../../utils/helpers';
import { useQueryClient } from '@tanstack/react-query';

export default function GardenModeling() {
  const { gardenId } = useParams();
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = getGarden(gardenId, queryClient);
  const [selected, setSelected] = useState([]);
  const [modelingState, setModelingState] = useState(false);
  const [editingPlot, setEditingPlot] = useState(null);

  const { isLoading: plotsIsLoading, isError: plotsIsError, data: plotsData, error: plotsError } = getPlots(gardenId);

  const gridSize = 12;

  const grid = useMemo(() => {
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        grid.push({ x: i, y: j });
      }
    }
    return grid;
  }, []);

  const isBeside = (cell, index) => {
    return (
      selected.length == 0 ||
      selected.includes(index) ||
      (selected.includes(index - 1) && cell.y != 0) ||
      (selected.includes(index + 1) && cell.y != gridSize - 1) ||
      (selected.includes(index - gridSize) && cell.x != 0) ||
      (selected.includes(index + gridSize) && cell.x != gridSize - 1)
    );
  };

  const unitIsClaimed = (index) => {
    if (editingPlot != null) {
      return units.filter((unit) => !editingPlot.units.includes(unit)).includes(index);
    } else {
      return units.includes(index);
    }
  };

  const handleAddPlot = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((item) => item !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const postCreatePlot = createPlot(gardenId, queryClient);
  const postUpdatePlot = editPlot(gardenId, queryClient);
  const postDeletePlot = deletePlot(gardenId, queryClient);

  const handleAddPlotSubmit = () => {
    if (editingPlot != null) {
      console.log(editingPlot);
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
    setEditingPlot(plotsData[plotIndex]);
    setSelected(plotsData[plotIndex].units);
    setModelingState(true);
  };

  const handleDeletePlot = (plotIndex) => {
    postDeletePlot.mutate(plotsData[plotIndex].plot_id);
  };

  let units = [];

  if (!plotsIsLoading) {
    plotsData.forEach((plot) => {
      units = [...units, ...plot.units];
    });
  }

  return !isLoading && !plotsIsLoading ? (
    <div className="flex flex-1 items-stretch overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        {/* Primary column */}
        <section aria-labelledby="primary-heading" className="flex h-full min-w-0 flex-1 flex-col lg:order-last ">
          <h1 className="text-2xl font-bold text-gray-900">Modélisation du jardin</h1>

          <div className="grid grid-cols-12 max-w-md w-full mt-10 gap-2">
            {grid.map((cell, index) => (
              <button
                key={index}
                className={classNames(
                  `h-8 border border-gray-300`,
                  unitIsClaimed(index)
                    ? 'bg-red-500'
                    : selected.includes(index)
                    ? 'bg-green-500'
                    : !modelingState || !isBeside(cell, index)
                    ? 'bg-gray-400'
                    : 'bg-gray-200',
                )}
                onClick={() => handleAddPlot(index)}
                disabled={!modelingState || !isBeside(cell, index) || unitIsClaimed(index)}
              ></button>
            ))}
          </div>
          {/* Your content */}
        </section>
      </main>

      {/* Secondary column (hidden on smaller screens) */}
      <aside className="hidden w-64 overflow-y-auto border-l border-gray-200 bg-white lg:block">
        {/* Your content */}
        {!modelingState ? (
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none"
            onClick={() => setModelingState(true)}
          >
            Ajouter une parcelle
            <PlusIconOutline className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </button>
        ) : (
          <>
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none"
              onClick={handleAddPlotCancel}
            >
              Annuler
              <PlusIconOutline className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none"
              onClick={handleAddPlotSubmit}
            >
              Valider la parcelle
              <PlusIconOutline className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}

        <div>
          <ul role="list" className="divide-y divide-gray-200">
            {plotsData.map((plot, index) => (
              <li key={plot.id} className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Parcelle {index}</h3>
                      {/* TODO : ajouter un bouton pour modifier la parcelle */}
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none"
                          onClick={() => handleEditPlot(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div></div>
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none"
                          onClick={() => handleDeletePlot(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  ) : (
    <Loader />
  );
}
