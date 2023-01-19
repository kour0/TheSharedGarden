import { NavBar } from '../components/navigation/NavBar';


export default function About() {
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
          <div className="mx-auto max-w-7xl space-y-8 px-6 lg:px-8">
            <div className="mx-auto max-w-prose text-base lg:max-w-none">
              <h2 className="text-lg font-semibold text-teal-600">Notre projet</h2>
              <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                Nous avons fait un projet dans le cadre de notre formation.
              </p>
            </div>
            <div className="relative z-10 mx-auto max-w-prose text-base lg:mx-0 lg:max-w-5xl lg:pr-72">
              <p className="text-lg text-gray-500">
                Notre projet de jardin partagé est un concept innovant qui permet aux particuliers de partager leur propre jardin avec d'autres personnes intéressées par le jardinage. L'idée est de créer une plateforme en ligne où les gens peuvent s'inscrire et proposer leur jardin à la communauté.
              </p>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
              <div className="relative z-10">
                <div className="prose prose-teal mx-auto text-gray-500 lg:max-w-none">
                  <p>
                    Les membres peuvent alors demander à utiliser un jardin pour planter des fruits et légumes, rencontrer des voisins et participer à des activités de jardinage.
                  </p>
                  <p>
                    Notre projet est réalisé par quatre étudiants passionnés par l{"'"}agriculture urbaine et souhaitant promouvoir les bienfaits de la nature. Nous croyons que cette plateforme peut contribuer à renforcer les liens sociaux dans les quartiers et à améliorer la qualité de vie des citadins en leur offrant un accès facile à des espaces verts.
                  </p>
                  <h3>En résumé</h3>
                  <p>
                    Notre plateforme est facile à utiliser, les membres peuvent s{"'"}inscrire et proposer leur jardin en indiquant sa localisation, les fruits et légumes qu'ils ont l'intention de cultiver, les règles de partage et les disponibilités. Les utilisateurs peuvent alors rechercher des jardins disponibles proches de chez eux et demander à les utiliser.
                  </p>
                </div>
              </div>
              <div className="relative mx-auto mt-12 max-w-prose text-base lg:mt-0 lg:max-w-none">
                  <defs>
                    <pattern
                      id="bedc54bc-7371-44a2-a2bc-dc68d819ae60"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width={404} height={384} fill="url(#bedc54bc-7371-44a2-a2bc-dc68d819ae60)" />
                <blockquote className="relative rounded-lg bg-white shadow-lg">
                  <div className="rounded-t-lg px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8">
                    <img
                      src="https://tailwindui.com/img/logos/mark.svg?color=teal&shade=700"
                      alt="Workcation"
                      className="h-8"
                    />
                    <div className="relative mt-8 text-lg font-medium text-gray-700">
                      <svg
                        className="absolute top-0 left-0 h-8 w-8 -translate-x-3 -translate-y-2 transform text-gray-200"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="relative">
                        Notre objectif est de créer une communauté de jardiniers urbains partageant leur passion et leur savoir-faire. Si vous voulez vous inscrire ou en savoir plus sur notre projet, n'hésitez pas à nous contacter. Nous serions ravis de vous accueillir dans notre communauté de jardin partagé.
                      </p>
                    </div>
                  </div>
                  <cite className="relative flex items-center rounded-b-lg bg-teal-700 py-5 px-6 not-italic sm:mt-10 sm:items-start sm:py-5 sm:pl-12 sm:pr-10">
                <span className="relative flex-none rounded-full border-2 border-white sm:absolute sm:top-0 sm:-translate-y-1/2 sm:transform">
                  <img
                    className="h-12 w-12 rounded-full bg-teal-700 sm:h-20 sm:w-20"
                    // On ajoute la photo alexis.png dans src/assets/images
                    src="src/assets/images/alexis.png"
                    alt=""
                  />
                </span>
                    <span className="relative ml-4 font-semibold leading-6 text-gray-300 sm:ml-24 sm:pl-1">
                  <span className="font-semibold text-white sm:inline">Alexis MARCEL</span>{' '}
                      <span className="sm:inline">Responsable Backend</span>
                </span>
                  </cite>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
