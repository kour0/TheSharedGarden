export default function PageHeader({ title }) {
  return (
    <header className="bg-teal-700">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="py-5">
          <h1 className="text-2xl text-center font-bold text-white">{title}</h1>
        </div>
      </nav>
    </header>
  );
}
