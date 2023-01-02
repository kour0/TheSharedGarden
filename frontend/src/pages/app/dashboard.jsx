import React from 'react';
import { Link } from 'react-router-dom';
import { GardenCard } from '../../components/garden/GardenCard';
import MainPage from '../../components/layout/MainPage';
import { Loader } from '../../components/loader/FullScreenLoader';
import { getGardens } from '../../lib/gardens';

export default function Dashboard() {

  const { isLoading, isError, data, error } = getGardens();

  return !isLoading ? (
    <>
      <MainPage title="Mes jardins" subtitle="Les jardins auxquels vous participez.">
        {data.length === 0 ? (
          <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8">
            <h2 className="text-l tracking-tight text-gray-500 sm:text-xl">
              <span className="block">Vous n{"'"}avez pas encore de jardins ?</span>
              <span className="block">Créez-en un dès maintenant !</span>
            </h2>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/app/create-garden"
                  relative="path"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-teal-700 px-5 py-3 text-base font-medium text-white hover:bg-teal-800"
                >
                  Créer un jardin
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
            {data.map((garden, index) => (
              <GardenCard key={index} garden={garden}></GardenCard>
            ))}
          </div>
        )}
      </MainPage>
    </>
  ) : (
    <Loader />
  );
}
