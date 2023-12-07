import { NavBar } from '../components/navigation/NavBar';


export default function Team() {

  const people = [
    {
      name: 'Lucas Laurent',
      role: 'Chef de projet, Responsable algorithmique',
      imageUrl:
        'src/assets/images/lucas.jpg',
    },
    {
      name: 'Alexis Marcel',
      role: 'Responsable Back-End',
      imageUrl:
        'src/assets/images/alexis.png',
    },
    {
      name: 'Noé Steiner',
      role: 'Secrétaire/Responsable Front-End',
      imageUrl:
        'src/assets/images/noe.jpg'
    },
    {
      name: 'Mathias Aurand-Augier',
      role: 'Responsable de la base de données',
      imageUrl:
        'src/assets/images/mathias.jpg',
    },
  ];

  return (
    <div className="relative overflow-hidden bg-white lg-h-screen">
      <div className="hidden lg:absolute lg:inset-0 lg:block" aria-hidden="true">
        <svg
          className="absolute top-0 left-1/2 translate-x-64 -translate-y-8 transform"
          width={640}
          height={784}
          fill="none"
          viewBox="0 0 640 784"
        >
          <defs>
            <pattern
              id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
              x={118}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
        </svg>
      </div>

      <div className="relative pt-6 pb-8 sm:pb-16 lg:pb-24">
        <NavBar />
          <div className="overflow-hidden py-16">
            <div className="mx-auto max-w-7xl py-12 px-6 lg:px-8 lg:py-24">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
                <div className="space-y-5 sm:space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Notre Team</h2>
                  <p className="text-xl text-gray-500">
                    Voici les membres de notre équipe.
                  </p>
                </div>
                <div className="lg:col-span-2">
                  <ul role="list" className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8">
                    {people.map((person) => (
                      <li key={person.name}>
                        <div className="flex items-center space-x-4 lg:space-x-6">
                          <img className="h-16 w-16 rounded-full lg:h-20 lg:w-20" src={person.imageUrl} alt="" />
                          <div className="space-y-1 text-lg font-medium leading-6">
                            <h3>{person.name}</h3>
                            <p className="text-teal-700">{person.role}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}