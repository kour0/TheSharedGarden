import { NavBar } from '../components/NavBar'
import { UniqueFieldForm } from '../components/forms/UniqueFieldForm'
import { Map } from '../components/Map'

const navigation = [
  { name: 'Rejoignez un jardin', href: '/join'},
  { name: 'Qui sommes nous ?', href: '/' },
  { name: 'Le projet', href: '/' },
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
        <div className="h-1/3 bg-white sm:h-2/3" />
      </div>
      <NavBar navigation={navigation}></NavBar>
      <UniqueFieldForm form={form}></UniqueFieldForm>
      <div className="text-center mt-5">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">La carte</h2>
        <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
          Rejoignez un jardin directement en trouvant sa localisation sur la carte.
        </p>
      </div>
    </div>
  )
}