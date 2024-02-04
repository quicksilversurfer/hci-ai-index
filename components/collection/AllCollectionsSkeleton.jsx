export default async function AllCollectionsSkeleton() {
  return (
    <article className="group mt-24 rounded-lg overflow-hidden border-b border-b-base-900/20 relative h-[26rem] max-w-screen-2xl">
      <div className="relative 2xl:w-[1536px] sm:w-fit after:hidden sm:after:block  after:bg-yellow-light dark:after:bg-yellow after:top-0 after:h-full after:rounded-t-md after:w-8 after:absolute after:-right-4 after:skew-x-[30deg]">
        <h3 className="bg-yellow-light dark:bg-yellow h-full pt-4 px-6 rounded-t-md uppercase font-mono text-base-950">
          Loading...
        </h3>
      </div>
      <div className="bg-yellow-light dark:bg-yellow rounded-md rounded-tr-none sm:rounded-tr-md rounded-tl-none pt-4 h-full font-sans flex flex-col justify-between ">
        <div className="bg-gradient-to-b from-transparent to-90% to-base-900/10 text-base-900 h-full">
          <div className="px-6 relative flex flex-col animate-pulse h-full">
            <div className="h-6 bg-base-950/5 rounded-md mt-3 max-w-[80%]"></div>
            <div className="space-y-4 mt-4">
              <div className="h-3 bg-base-950/5 rounded mt-4 max-w-full"></div>
              <div className="h-3 bg-base-950/5 rounded mt-4 max-w-full"></div>
              <div className="h-3 bg-base-950/5 rounded mt-4 max-w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
