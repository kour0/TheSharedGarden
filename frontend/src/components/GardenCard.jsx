import { Link } from 'react-router-dom'

export function GardenCard({ garden }) {
    return (
        <Link key={garden._id} to={garden.href} relative='path' className="flex flex-col overflow-hidden rounded-lg shadow-lg">
            <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={garden.imageUrl} alt="" />
            </div>
            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-900">{garden.title}</p>
                    <p className="mt-3 text-base text-gray-500">{garden.description}</p>
                </div>
                <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                        <span className="sr-only">{garden.author.name}</span>
                        <img className="h-10 w-10 rounded-full" src={garden.author.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                            {garden.author.name}
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime={garden.datetime}>Crée le {garden.date}</time>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}