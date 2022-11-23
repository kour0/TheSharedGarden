import { NavBar } from '../../components/navigation/NavBar'
import { UniqueFieldForm } from '../../components/forms/UniqueFieldForm'
import { Map } from '../../components/Map'
import SideBar from '../../components/layout/SideBar'

const form =
{
  title: 'Rejoignez un jardin',
  description:
    'Vous pouvez trouver un jardin public en le recherchant par son nom',
  placeholder: 'Entrez le nom du jardin',
  button: {
    name: 'Rechercher'
  },
}

export default function JoinGarden() {
  return (

      <div className="relative bg-gray-50 px-4 pt-6 pb-16 sm:px-6 lg:px-8 lg:pb-28">
        <div className="absolute inset-0">
          <div className="bg-white" />
        </div>
        <div className="max-w-7xl mx-auto">
          <UniqueFieldForm form={form}></UniqueFieldForm>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">La carte</h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              Vous pouvez rejoindre un jardin en cliquant sur la carte.
            </p>
            <Map></Map>
          </div>
        </div>
      </div>

  )
}