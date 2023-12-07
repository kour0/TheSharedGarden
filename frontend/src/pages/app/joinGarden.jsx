import { UniqueFieldForm } from '../../components/forms/UniqueFieldForm';
import MainPage from '../../components/layout/MainPage';
import { Map } from '../../components/Map';

const form = {
  title: 'Recherchez un jardin',
  description: 'Vous pouvez trouver un jardin public en le recherchant par son nom',
  placeholder: 'Entrez le nom du jardin',
  button: {
    name: 'Rechercher',
  },
  url: 'http://127.0.0.1:5454/api/join-garden',
  name: 'garden_name',
};

export default function JoinGarden() {
  return (
    <MainPage
      title="Rejoindre un jardin"
      subtitle="Rechercher ou cliquer sur la carte pour rejoindre un jardin public."
    >
      <UniqueFieldForm form={form}></UniqueFieldForm>
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">La carte</h2>
        <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
          Vous pouvez rejoindre un jardin en cliquant sur la carte.
        </p>
        <Map></Map>
      </div>
    </MainPage>
  );
}
