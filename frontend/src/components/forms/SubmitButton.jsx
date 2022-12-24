export function SubmitButton({ isLoading }) {
  return (
    <button
      type="submit"
      className={
        (isLoading ? 'bg-gray-600' : 'bg-teal-700 hover:bg-teal-800') +
        ' inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2'
      }
      disabled={isLoading}
    >
      {isLoading ? 'En cours...' : 'Enregistrer'}
    </button>
  );
}
