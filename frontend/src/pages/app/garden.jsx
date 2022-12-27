import { useParams } from 'react-router-dom';
import { getGarden } from '../../lib/gardens';
import { useDroppable } from '@dnd-kit/core';
import { Loader } from '../../components/loader/FullScreenLoader';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Garden() {
  const { gardenId } = useParams();
  const { isLoading, isError, data, error } = getGarden(gardenId);
  const { setNodeRef, isOver } = useDroppable({ 
    id: 'garden',
  });

  const grid = useMemo(() => {
      const grid = [];
      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
          grid.push({ x: i, y: j });
        }
      }
      return grid;
    }
    , []);

  console.log(data);

  return !isLoading ? (
    <div>
      <Link to={`/app/dashboard/${gardenId}/modeling`}>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Modelisation
        </button>
      </Link>
    </div>

    // <div className='grid grid-cols-12 max-w-md mx-auto w-full mt-24 gap-2'>
    //   {
    //     grid.map((cell, index) => (
    //       <div
    //         key={index}
    //         className={`h-8  bg-gray-200 border border-gray-300`}
    //       ></div>
    //     ))
    //   }
    // </div>
  ) : (
    <Loader />
  );

}