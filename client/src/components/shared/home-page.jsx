import {
  CallToAction,
  Features,
  Footer,
  Hero,
  Works,
} from "@/components/shared";

const HomePage = () => {
  return (
    <div className="h-full px-24">
      <BackgroundPattern />
      <Hero />
      <Works />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;

function BackgroundPattern() {
  return (
    <>
      <div className="absolute inset-0 z-0 bg-center bg-cover bg-hero-pattern rounded-bl-[10px]"></div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-[#000] bg-[linear-gradient(to_right,#8685852e_1px,transparent_1px),linear-gradient(to_bottom,#8685852e_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>{" "}
      <div className="absolute inset-0 z-0 bg-center bg-cover bg-hero-pattern-bottom rounded-br-[10px]"></div>
    </>
  );
}
