import AnimatedShinyText from "@/components/animations/AnimatedShinyText";
import IconsShape from "@/components/icons/IconsShape";
import { partners } from "@/constants";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRightIcon, Triangle } from "lucide-react";

const Hero = () => {
  return (
    <>
      <section className="pt-[227px] w-full relative max-w-full h-full mb-[232px]">
        <div className="flex flex-col items-center justify-center text-center">
          <div
            className={cn(
              "group rounded-full border border-black/25 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-transparent dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span className="text-sm font-normal">
                ✨ Luma now realease version v1.
              </span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
          <IconsShape className="absolute bottom-0 top-[7.3rem] left-44" />
          <IconsShape className="absolute right-[10.3rem] bottom-[50.7rem]" />
          <h1 className="text-[70px] leading-[81.6px] font-bold max-w-[1088px] w-full text-black dark:bg-gradient-text z-30 pt-5">
            Elevate your brand with unmatched creative excellence
          </h1>
          <p className="text-lg font-medium max-w-[556px] w-full text-grayLight dark:text-grayDark pt-6">
            Discover the most incredible creations hand-crafted to elevate your
            website or app and better position your brand.
          </p>

          <Link
            href="/"
            className="flex items-center gap-[10px] px-6 py-2 bg-black rounded-full shadow dark:bg-[#ededed] dark:hover:bg-grayC justify-center mt-8"
          >
            <Triangle className="border-none outline-none size-6 dark:fill-black fill-white" />
            <span className="text-lg font-medium text-white dark:text-black">
              Get a demo
            </span>
          </Link>

          <div className="relative mt-[8%] w-full">
            <img
              src={"/assets/images/bg-img.webp"}
              alt="banner image"
              height={1200}
              width={1200}
              className="w-full border-2 rounded-tl-2xl rounded-tr-2xl border-muted"
            />
            <div className="absolute bottom-0 left-0 right-0 z-10 top-1/2 bg-gradient-to-t dark:from-background"></div>
          </div>

          <div className="relative z-10 -mt-20 bg-gradient-text">
            <h2 className="font-bold text-9xl">Luma</h2>
          </div>

          <div className="flex flex-col items-center justify-center pt-7">
            <span className="text-sm font-medium mb-7 dark:text-grayLight">
              Our designs are featured on:
            </span>

            <StaticLogoCloud />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

function StaticLogoCloud() {
  return (
    <div className="grid grid-cols-3 gap-x-[5.5rem] md:grid-cols-5 lg:grid-cols-6">
      {partners.map((logo, key) => (
        <img
          key={key}
          src={logo.path}
          className="h-10 px-2 w-28 brightness-0 dark:invert"
          alt={`${logo.name}`}
        />
      ))}
    </div>
  );
}
