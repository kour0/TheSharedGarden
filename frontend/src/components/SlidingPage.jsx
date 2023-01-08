import { Combobox, Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getPlotVegetable, modifyPlotVegetable } from '../lib/plots';
import { addTask, deleteTask, getPlants, getTasks, patchPlant } from '../lib/tasks';
import { classNames } from '../utils/helpers';
import { Loader } from './loader/FullScreenLoader';

export default function SlidingPage({ open, setOpen, selectedUnit }) {
  const { gardenId } = useParams();
  const queryClient = useQueryClient();
  const { data: vegetable, isLoading: vegetableIsLoading } = getPlotVegetable(gardenId, selectedUnit.plot_id);
  const [query, setQuery] = useState('');
  const [selectedPlant, setSelectedPlant] = useState(null);

  const { register, resetField, handleSubmit } = useForm();

  const { data: plants, isLoading: plantsIsLoading } = getPlants();
  const { data: tasks, isLoading: tasksIsLoading } = getTasks(gardenId, selectedUnit.plot_id);

  console.log(plants, vegetable);

  const addTaskMutation = addTask(gardenId, selectedUnit.plot_id, queryClient);
  const deleteTaskMutation = deleteTask(gardenId, selectedUnit.plot_id, queryClient);

  const submitTask = (data) => {
    addTaskMutation.mutate(data);
    resetField('title');
    resetField('description');
  };

  const handleDeleteTask = (id) => {
    deleteTaskMutation.mutate(id);
  };

  const patchVegetableMutation = modifyPlotVegetable(gardenId, queryClient);
  const patchPlantMutation = patchPlant(gardenId, selectedUnit.plot_id, queryClient);

  const handleChangePlant = () => {
    setQuery(selectedPlant.name);
    patchPlantMutation.mutate(selectedPlant);
  };

  const filteredPlants =
    query === ''
      ? plants
      : plants.filter((plant) => {
          return plant.name.toLowerCase().includes(query.toLowerCase());
        });

  return !tasksIsLoading && !plantsIsLoading && !vegetableIsLoading ? (
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
                    <Combobox
                      as="div"
                      value={selectedPlant}
                      onChange={setSelectedPlant}
                      className="px-4 sm:px-6 lg:px-8 pb-5"
                    >
                      <Combobox.Label className="block text-sm font-medium text-gray-700">Plantation</Combobox.Label>
                      <div className="relative mt-1">
                        <Combobox.Input
                          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          onChange={handleChangePlant}
                          placeholder={vegetable.vegetable}
                          displayValue={(plant) => plant?.name}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Combobox.Button>

                        {filteredPlants.length > 0 && (
                          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredPlants.map((plant) => (
                              <Combobox.Option
                                key={plant.id}
                                value={plant}
                                className={({ active }) =>
                                  classNames(
                                    'relative cursor-default select-none py-2 pl-3 pr-9',
                                    active ? 'bg-teal-600 text-white' : 'text-gray-900',
                                  )
                                }
                              >
                                {({ active, selected }) => (
                                  <>
                                    <span className={classNames('block truncate', selected && 'font-semibold')}>
                                      {plant.name}
                                    </span>

                                    {selected && (
                                      <span
                                        className={classNames(
                                          'absolute inset-y-0 right-0 flex items-center pr-4',
                                          active ? 'text-white' : 'text-teal-600',
                                        )}
                                      >
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    )}
                                  </>
                                )}
                              </Combobox.Option>
                            ))}
                          </Combobox.Options>
                        )}
                      </div>
                    </Combobox>
                    {selectedPlant && selectedPlant.name !== 'Aucune plante sélectionnée' && (
                      <button
                        type="button"
                        className=" ml-8 mb-4 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-6 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => {
                          let plot = selectedUnit;
                          plot.id = selectedPlant.name;
                          patchVegetableMutation.mutate(plot);
                        }}
                      >
                        Sauvegarder
                      </button>
                    )}
                    <div className="px-4 sm:px-6 lg:px-8">
                      <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                          <h1 className="text-xl font-semibold text-gray-900">Taches</h1>
                          <p className="mt-2 text-sm text-gray-700">Visualisez, supprimez et ajoutez des taches.</p>
                        </div>
                      </div>
                      <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                      Titre
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                      Description
                                    </th>

                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                      <span className="sr-only">Delete</span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                  {tasks.map((task) => (
                                    <tr key={task.id}>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {task.title}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {task.description}
                                      </td>
                                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <button
                                          type="button"
                                          className="text-red-600 hover:text-red-900"
                                          onClick={() => {
                                            handleDeleteTask(task.id);
                                          }}
                                        >
                                          Delete<span className="sr-only">, {task.title}</span>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 sm:px-6 lg:px-8 pb-5 pt-7 isolate -space-y-px rounded-md">
                      <form action="" onSubmit={handleSubmit(submitTask)}>
                        <div className="relative rounded-md rounded-b-none border border-gray-300 px-3 py-2 focus-within:z-10 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                          <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                            Titre
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                            placeholder="Titre de la tache"
                            {...register('title')}
                          />
                        </div>
                        <div className="relative rounded-md rounded-t-none border border-gray-300 px-3 py-2 focus-within:z-10 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                          <label htmlFor="job-title" className="block text-xs font-medium text-gray-900">
                            Description
                          </label>
                          <input
                            type="text"
                            name="job-title"
                            id="job-title"
                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                            placeholder="Courte description de la tache a réaliser"
                            {...register('description')}
                          />
                        </div>
                        <button
                          type="submit"
                          className="mt-2 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-6 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Ajouter
                        </button>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  ) : (
    <>
      <Loader></Loader>
    </>
  );
}
