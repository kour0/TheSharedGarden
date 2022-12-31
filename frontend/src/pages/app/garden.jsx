import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../../components/loader/FullScreenLoader';
import { getPlots } from '../../lib/gardens';

import grassIcon from '../../assets/images/grass-icon.png';
import plant from '../../assets/images/plant.png';

export default function Garden() {
  const { gardenId } = useParams();
  const queryClient = useQueryClient();

  const [plots, setPlots] = useState([]);
  const [units, setUnits] = useState([]);

  const {
    isLoading: plotsIsLoading,
    isError: plotsIsError,
    data: plotsData,
    error: plotsError,
  } = getPlots(gardenId, setPlots, setUnits);

  const gridSize = 12;
  const grid = [];

  if (!plotsIsLoading) {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        grid.push({ x: i, y: j });
      }
    }
    for (const square of grid) {
      square.index = grid.indexOf(square);
      for (const plot of plotsData) {
        if (plot.units.includes(square.index)) {
          square.plot = plot;
        }
      }
    } 
  }

  const handleCaseClick = (cell) => {
    if (cell.plot) {
      console.log('plot');
    }
  };

  return !plotsIsLoading ? (
    <div className="flex flex-1 items-stretch overflow-hidden">
      <main className="flex-1 h-screen">
        {/* Primary column */}
        <section aria-labelledby="primary-heading" className="flex h-full min-w-0 flex-1 flex-col lg:order-last">
          <div className="text-center mt-5">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Visualisation de votre jardin
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">Editez les taches et les plantations</p>
          </div>

          <div className="grid grid-cols-12 gap-1 my-10 mx-auto overflow-auto">
            {grid.map((cell, index) => (
              <button
                key={index}
                className={'h-10 w-10 border-1 border-gray-300 rounded-md bg-green-700'}
                onClick={() => handleCaseClick(cell)}
              >
                {
                  cell.plot ? (
                    <img src={plant} alt={'plant'}/>
                  ) : (
                    <img src={grassIcon} alt={'grass'}/>
                  )
                }
              </button>
            ))}
          </div>
          {/* Your content */}
        </section>
      </main>

      {/* Secondary column (hidden on smaller screens) */}
      <aside className="hidden w-64 overflow-y-auto border-l p-4 border-gray-200 bg-white lg:block">
        <div className="relative mt-5">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-lg font-medium text-gray-900">Modelisation</span>
          </div>
        </div>

        <p className="m-2 text-sm text-gray-500">Editez les parcelles du jardin</p>
        <Link
          to={`/app/dashboard/${gardenId}/modeling`}
          relative="path"
          className="inline-flex items-center justify-center rounded-md border border-transparent w-full bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none"
        >
          Modelisation
        </Link>
      </aside>
    </div>
  ) : (
    <Loader />
  );
}
