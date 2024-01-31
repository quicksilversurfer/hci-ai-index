import CreateCollection from "@/components/collection/CreateCollection";

export default function Create() {
  return (
    <main className="flex flex-col px-4 2xl:px-0 grow">
      <h1 className="font-display text-8xl mr-4 sm:mr-0 mb-8 mt-24">create</h1>
      <h2 className="font-display text-3xl text-pretty max-w-[55ch] text-base-600">
        create a collection by asking ai about any topic in hci — generate a
        summary, and a collection of relevant papers
      </h2>
      <CreateCollection />
    </main>
  );
}
