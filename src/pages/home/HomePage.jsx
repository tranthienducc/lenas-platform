import { Features, Header, Hero, Works } from "@/components/shared/index";

const HomePage = () => {
  return (
    <div className="h-full">
      <Header />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-inherit bg-[radial-gradient(#8685852e_1px,transparent_1px)] [background-size:16px_16px]"></div>
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-[#000] bg-[linear-gradient(to_right,#8685852e_1px,transparent_1px),linear-gradient(to_bottom,#8685852e_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>{" "} */}
      <Hero />
      <Works />
      <Features />
    </div>
  );
};

export default HomePage;
