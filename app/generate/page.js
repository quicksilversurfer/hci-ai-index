import CreateCollection from "@/components/collection/CreateCollection";

export default function Create() {
  return (
    <main className="flex flex-col w-full grow pb-content-y">
      <header className="page-header pb-rhythm-6 content-shell px-4 lg:px-6 mt-8">
        <h1 className="font-display text-display-1 tracking-tight text-base-950 dark:text-base-50">
          generate
        </h1>
        <p className="font-altSans text-display-4 font-light text-pretty max-w-4xl text-base-700 dark:text-base-300">
          semantic search powered by RAG — explore availability across the archive by asking questions in natural language
        </p>
      </header>

      <div className="content-shell px-4 lg:px-6">
        <CreateCollection />
      </div>
    </main>
  );
}
