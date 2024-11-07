import SubscriptionForm from "@/components/forms/SubscriptionForm";
import IconsLoading from "@/components/icons/IconsLoading";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingCards } from "@/constants";
import { getStripe } from "@/lib/stripe/stripe-client";
import { useGetSubscriptionByAgency } from "@/lib/tanstack-query/queries";
import { useModal } from "@/providers/modal-provider";
import { Elements } from "@stripe/react-stripe-js";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const SubscriptionFormWrapper = ({ customerId, planExists }) => {
  const { data, setClose } = useModal();
  const { data: subscriptionExists } = useGetSubscriptionByAgency(customerId);
  const [selectedPriceId, setSelectedPriceId] = useState(
    data?.plans?.defaultPriceId || ""
  );
  const [subscription, setSubscription] = useState({
    subscriptionId: "",
    clientSecret: "",
  });

  const options = useMemo(
    () => ({
      clientSecret: subscription?.clientSecret,
      appearance: {
        theme: "flat",
      },
    }),
    [subscription]
  );

  useEffect(() => {
    if (!selectedPriceId) return;

    const createSecret = async () => {
      const subscriptionResponse = await fetch(
        "/api/stripe/create-subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId,
            priceId: selectedPriceId,
            subscriptionExists: subscriptionExists,
          }),
        }
      );
      const subscriptionResponseData = await subscriptionResponse.json();

      setSubscription({
        clientSecret: subscriptionResponseData.clientSecret,
        subscriptionId: subscriptionResponseData.subscriptionId,
      });

      if (planExists) {
        toast("Success", {
          description: "Your plan has been successfully upgraded!",
        });
        setClose();
      }
    };

    createSecret();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedPriceId, customerId]);

  console.log("subscription-form", subscriptionExists);

  return (
    <div className="transition-all border-none">
      <div className="flex flex-col gap-4">
        {data?.plans?.plans?.map((price) => (
          <Card
            key={price?.id}
            onClick={() => setSelectedPriceId(price?.id)}
            className={clsx("relative cursor-pointer transition-all", {
              "border-primary": selectedPriceId === price?.id,
            })}
          >
            <CardHeader>
              <CardTitle>
                ${price?.unit_amount ? price?.unit_amount / 100 : "0"}
                <p className="text-sm">{price.nickname}</p>
                <p className="text-sm text-muted-foreground">
                  {
                    pricingCards.find((p) => p.priceId === price.id)
                      ?.description
                  }
                </p>
              </CardTitle>
            </CardHeader>
            {selectedPriceId === price?.id && (
              <div className="absolute rounded-full size-2 bg-emerald-500 top-4 right-4" />
            )}
          </Card>
        ))}

        {options.clientSecret && !planExists && (
          <>
            <h1 className="text-xl">Payment Method</h1>
            <Elements stripe={getStripe()} options={options}>
              <SubscriptionForm selectedPriceId={selectedPriceId} />
            </Elements>
          </>
        )}

        {!options.clientSecret && selectedPriceId && (
          <div className="flex items-center justify-center w-full h-40">
            <IconsLoading />
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionFormWrapper;

SubscriptionFormWrapper.propTypes = {
  customerId: PropTypes.string,
  planExists: PropTypes.bool,
  data: PropTypes.array,
};
