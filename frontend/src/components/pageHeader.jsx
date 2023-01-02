export default function PageHeader({ title, subtitle }) {
  return (
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">{subtitle}</p>
      </div>
  );
}
