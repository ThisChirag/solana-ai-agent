type Project = {
  name: string;
  imageUrl: string;
  link: string;
};

const projects: Project[] = [
  {
    name: "Solana-Playground",
    imageUrl: "https://res.coinpaper.com/coinpaper/solana_sol_logo_28f7fb0af5.svg",
    link: "https://github.com/solana-playground/solana-playground",
  },
];

export const Team = () => {
  return (
    <div className="py-24 sm:py-32">
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] bg-repeat-round"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">
            <span className="relative inline-block">
              <span
                className="bg-gradient-to-r from-[#9945FF] via-[#8752F3] to-[#14F195] bg-clip-text text-transparent blur-md"
                aria-hidden="true"
              >
                Solana Playground
              </span>
              <span 
                className="absolute inset-0 bg-gradient-to-r from-[#9945FF] via-[#8752F3] to-[#14F195] bg-clip-text text-transparent"
              >
                Solana Playground
              </span>
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Quickly develop, deploy and test Solana programs from browsers
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {projects.map((project) => (
            <li key={project.name}>
              <div className="flex items-center justify-center gap-x-6">
                <img
                  className="h-16 w-16 rounded-full"
                  src={project?.imageUrl}
                  alt=""
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {project.name}
                  </h3>
                  {/* <p className="text-sm font-semibold leading-6 text-gray-600">
                    {person.role}
                  </p> */}
                  <div className="mt-2">
                    <a
                      href={project?.link}
                      target="_blank"
                      className="text-md font-semibold text-green-600 hover:underline"
                    >
                      Github Repository &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
