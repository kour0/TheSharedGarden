import { useParams } from 'react-router-dom';
import { createPlot, getGarden } from '../../lib/gardens';
import { useDroppable } from '@dnd-kit/core';
import { Loader } from '../../components/loader/FullScreenLoader';
import { useMemo, useState } from 'react';
import { PlusIcon as PlusIconOutline } from '@heroicons/react/24/outline';
import { classNames } from '../../utils/helpers';

export default function GardenModeling() {
  const { gardenId } = useParams();
  const { isLoading, isError, data, error } = getGarden(gardenId);
  const [selected, setSelected] = useState([]);
  const [addPlot, setAddPlot] = useState(false);

  const { setNodeRef, isOver } = useDroppable({
    id: 'garden',
  });

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

  const isBeside = (index) => {
    if (selected.length === 0) {
      return true;
    }

    if (
      selected.includes(index - 1) ||
      selected.includes(index + 1) ||
      selected.includes(index - gridSize) ||
      selected.includes(index + gridSize)
    ) {
      return true;
    }
    return false;
  };

  const handleAddPlot = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((item) => item !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const postCreatePlot = createPlot(gardenId);

  const handleAddPlotSubmit = () => {
    postCreatePlot.mutate(selected);
    setAddPlot(false);
    setSelected([]);
  };

  const handleAddPlotCancel = () => {
    setAddPlot(false);
    setSelected([]);
  };

  return !isLoading ? (
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
                  `h-8 bg-gray-200 border border-gray-300`,
                  selected.includes(index) && 'bg-green-500',
                )}
                onClick={() => handleAddPlot(index)}
                disabled={!addPlot || !isBeside(index)}
              ></button>
            ))}
          </div>
          {/* Your content */}
        </section>
      </main>

      {/* Secondary column (hidden on smaller screens) */}
      <aside className="hidden w-64 overflow-y-auto border-l border-gray-200 bg-white lg:block">
        {/* Your content */}
        {!addPlot ? (
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none"
            onClick={() => setAddPlot(true)}
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
      </aside>
    </div>
  ) : (
    <Loader />
  );
}
