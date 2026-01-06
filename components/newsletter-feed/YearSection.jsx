export default function YearSection({ year, children }) {
  return (
    <section className="space-y-4">
      <div className="content-shell px-4 lg:px-6">
        <div className="flex items-center gap-3 pb-1">
          <h2 className="text-body-md font-medium font-altSans text-base-900 dark:text-base-50">
            {year}
          </h2>
        </div>
      </div>
      <div className="flex flex-col">
        {children}
      </div>
    </section>
  );
}
