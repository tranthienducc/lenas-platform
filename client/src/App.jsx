import {
  CallToAction,
  Features,
  Footer,
  Hero,
  Works,
} from "@/components/shared";

function App() {
  return (
    <div className="h-full px-24">
      <div className="absolute inset-0 bg-center bg-cover bg-hero-pattern -z-20"></div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-inherit bg-[radial-gradient(#8685852e_1px,transparent_1px)] [background-size:16px_16px]"></div>
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-[#000] bg-[linear-gradient(to_right,#8685852e_1px,transparent_1px),linear-gradient(to_bottom,#8685852e_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>{" "} */}
      <Hero />
      <Works />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;
