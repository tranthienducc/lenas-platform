import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/constants";
import { useGetPricesFromStripe } from "@/lib/tanstack-query/queries";

import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { Check } from "lucide-react";

const PricingPage = () => {
  const { data: prices } = useGetPricesFromStripe();

  return (
    <div className="py-[92px] px-[221px] w-full max-w-full">
      <div className="grid gap-[1px] grid-cols-pricing-mansory max-w-[1079px] w-full rounded-xl">
        <div className="relative flex items-center justify-center col-span-4 py-[43px] border-grid h-[384px] pl-[109px] pr-[99px]">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-[#000] bg-[linear-gradient(to_right,#8685852e_1px,transparent_1px),linear-gradient(to_bottom,#8685852e_1px,transparent_1px)] bg-[size:6.8rem_6rem]"></div>
          <div className="z-20 bg-[#000] max-w-[898px] w-full p-12 flex items-center justify-center text-center flex-col h-[191px]">
            <h1 className="text-5xl font-semibold whitespace-nowrap">
              Find a plan to power your projects.
            </h1>
            <p className="mt-4 text-xl font-normal text-grayLight dark:text-grayDark">
              From early-stage startups to growing enterprises, Lenas has you
              covered.
            </p>
          </div>
        </div>

        {prices?.data?.map((card) => (
          <div
            key={card.nickname}
            className="relative flex flex-col w-full col-span-1 gap-8 px-8 py-12 border-grid"
          >
            <Card
              className={clsx("rounded-2xl", {
                "border-2 border-primary": card?.nickname !== "Unlimited Saas",
              })}
            >
              <CardHeader>
                <CardTitle
                  className={clsx("", {
                    "text-muted-foreground":
                      card?.nickname !== "Unlimited Saas",
                  })}
                >
                  {card?.nickname}
                </CardTitle>
                <CardDescription>
                  {
                    pricingCards.find((c) => c.title === card?.nickname)
                      ?.description
                  }
                </CardDescription>
              </CardHeader>

              <CardContent>
                <span className="text-4xl font-bold">
                  {card?.unit_amount && card?.unit_amount / 100}
                </span>
                <span className="text-muted-foreground">
                  <span>/ {card?.recurring?.interval}</span>
                </span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                {pricingCards
                  .find((c) => c.title === card?.nickname)
                  ?.features((feature) => (
                    <div key={feature} className="flex gap-2">
                      <Check />
                      <p>{feature}</p>
                    </div>
                  ))}
                <Link
                  to={`/dashboard?plan=${card?.id}`}
                  className={clsx(
                    "w-full text-center bg-primary p-2 rounded-md",
                    {
                      "!bg-muted-foreground":
                        card?.nickname !== "Unlimited Saas",
                    }
                  )}
                >
                  Get started
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
        <Card className={clsx("flex flex-col justify-between")}>
          <CardHeader>
            <CardTitle
              className={clsx({
                "text-muted-foreground": true,
              })}
            >
              {pricingCards[0].title}
            </CardTitle>
            <CardDescription>{pricingCards[0].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-bold">$0</span>
            <span>/ month</span>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            {pricingCards
              .find((c) => c.title === "Starter")
              ?.features?.map((feature) => (
                <div key={feature} className="flex gap-2">
                  <Check />
                  <p>{feature}</p>
                </div>
              ))}
            <Link
              to={`/agency`}
              className={clsx(
                "w-full text-center p-2 rounded-xl border border-white/15 bg-inherit",
                {
                  "!bg-muted-foreground": true,
                }
              )}
            >
              Get started
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PricingPage;
