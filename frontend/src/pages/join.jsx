import { NavBar } from '../components/NavBar'
import { UniqueFieldForm } from '../components/forms/UniqueFieldForm'
import { Map } from '../components/Map'

const navigation = [
  { name : "Créer un jardin", href : "/create"},
  { name: 'Rejoignez un jardin', href: '/join'},
]

const form =
  {
    title: 'Rejoignez un jardin',
    description:
      'Vous pouvez trouver un jardin public en le recherchant par son nom',
    placeholder : 'Entrez le nom du jardin',
    button : {
      name: 'Rechercher'
    },
  }

export default function Join() {
  return (

    <div className="relative bg-gray-50 px-4 pt-6 pb-16 sm:px-6 lg:px-8 lg:pb-28">
      <div className="absolute inset-0">
        <div className="bg-white" />
      </div>
      <NavBar navigation={navigation}></NavBar>
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