import { classNames } from '../../utils/helpers';

export default function GardenGrid({ className, plots, isDisabled, getImage, handleCaseClick }) {
  const gridSize = 12;
  const grid = [];

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      grid.push({ x: i, y: j });
    }
  }
  for (const cell of grid) {
    cell.index = grid.indexOf(cell);
    for (const plot of plots) {
      if (plot.units.includes(cell.index)) {
        cell.plot = plot;
      }
    }
  }

  return (
    <div className="grid grid-cols-12 gap-1 my-10 mx-auto overflow-auto">
      {grid.map((cell, index) => (
        <button
          key={index}
          className={classNames('h-10 w-10 border-1 border-gray-300 rounded-md', className(cell))}
          onClick={() => handleCaseClick(cell)}
          disabled={isDisabled(cell)}
        >
          <img src={getImage(cell)} className="rounded-md" />
        </button>
      ))}
    </div>
  );
}
