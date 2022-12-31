import { Dialog, Transition } from '@headlessui/react';
import { PencilIcon, PlusIcon } from '@heroicons/react/20/solid';
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import grassIcon from '../../assets/images/grass-icon.png';
import plant from '../../assets/images/plant.png';
import { Loader } from '../../components/loader/FullScreenLoader';
import { getPlots } from '../../lib/gardens';

export default function Garden() {
  const { gardenId } = useParams();
  const queryClient = useQueryClient();

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [open, setOpen] = useState(false);
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
      setSelectedUnit(cell.plot);
      setOpen(true);
    }
  };

  return !plotsIsLoading ? (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4 pl-2">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="h-full overflow-y-auto bg-white p-8">
                      <div className="space-y-6 pb-16">
                        <div>
                          <div className="aspect-w-10 aspect-h-7 block w-40 overflow-hidden rounded-lg">
                            <img
                              src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
                              alt=""
                              className="object-cover"
                            />
                          </div>
                          {/* Project name */}
                          <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                              >
                                Project name
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <input
                                type="text"
                                name="project-name"
                                id="project-name"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          {/* Project description */}
                          <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                              <label
                                htmlFor="project-description"
                                className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                              >
                                Description
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <textarea
                                id="project-description"
                                name="project-description"
                                rows={3}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                defaultValue={''}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="flex-1 rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                          >
                            Sauvegarder
                          </button>
                          <button
                            type="button"
                            className="ml-3 flex-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="flex flex-1 items-stretch overflow-hidden">
        <main className="flex-1 h-screen">
          {/* Primary column */}
          <section aria-labelledby="primary-heading" className="flex h-full min-w-0 flex-1 flex-col lg:order-last">
            <div className="text-center mt-5">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Visualisation de votre jardin
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
                Editez, visualisez les taches et les plantations
              </p>
            </div>

            <div className="grid grid-cols-12 gap-1 my-10 mx-auto overflow-auto">
              {grid.map((cell, index) => (
                <button
                  key={index}
                  className={'h-10 w-10 border-1 border-gray-300 rounded-md bg-green-700'}
                  disabled={!cell.plot}
                  onClick={() => handleCaseClick(cell)}
                >
                  {cell.plot ? <img src={plant} alt={'plant'} /> : <img src={grassIcon} alt={'grass'} />}
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
    </>
  ) : (
    <Loader />
  );
}
