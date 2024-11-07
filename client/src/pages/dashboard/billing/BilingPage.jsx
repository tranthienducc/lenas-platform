import PricingCard from "@/components/common/PricingCard";
import SubscriptionFormWrapper from "@/components/forms/SubscriptionForm/SubscriptionFormWrapper";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pricingCards } from "@/constants";
import {
  useGetAddOnsFromStripe,
  useGetAgencySubscription,
  useGetChargesFromStripe,
  useGetPricesFromStripe,
} from "@/lib/tanstack-query/queries";
import CustomModal from "@/pages/subaccount/pipelines/_components/CustomModal";
import { useModal } from "@/providers/modal-provider";
import { useParams, useSearch } from "@tanstack/react-router";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useEffect } from "react";

const BilingPage = () => {
  const { id } = useParams({ strict: false });
  const { data: addOns } = useGetAddOnsFromStripe();

  const { data: agencySubscription } = useGetAgencySubscription(id);
  const { data: prices } = useGetPricesFromStripe();

  const currentPlanDetails = pricingCards.find(
    (pricing) => pricing.priceId === agencySubscription?.Subscription?.priceId
  );

  const { data: charges } = useGetChargesFromStripe(agencySubscription);

  const allCharges = [
    ...(Array.isArray(charges?.data)
      ? charges.data.map((charge) => ({
          description: charge.description,
          id: charge.id,
          date: `${new Date(charge.created * 1000).toLocaleTimeString()} ${new Date(charge.created * 1000).toLocaleDateString()}`,
          status: "Paid",
          amount: `${charge.amount / 100}`,
        }))
      : []),
  ];

  console.log("cusomerid", agencySubscription);

  return (
    <>
      <SubscriptionHelper
        prices={prices?.data}
        customerId={agencySubscription?.customerId}
        planeExists={agencySubscription?.Subscription?.active === true}
      />
      <h1 className="text-4xl font-medium">Billing</h1>
      <Separator className="my-4" />
      <h2 className="text-xl font-normal text-grayLight dark:text-grayDark">
        Current Plan
      </h2>
      <div className="flex flex-col lg:!flex-row  justify-between gap-8">
        <PricingCard
          planeExists={agencySubscription?.Subscription?.active === true}
          prices={prices?.data}
          customerId={agencySubscription?.customerId || ""}
          amt={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.price || "$0"
              : "$0"
          }
          buttonCta={
            agencySubscription?.Subscription?.active === true
              ? "Change Plan"
              : "Get started"
          }
          highlightDesciption="Want to modify your plan? You can do this here. If you have further question contact support@luma-app.com"
          highlightTitle="Plan Options"
          description={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.description || "Let's get started"
              : "Lets get started! Pick a plan that works best for you."
          }
          duration="/ month"
          features={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.features || []
              : currentPlanDetails?.features ||
                pricingCards?.find(
                  (pricing) => pricing.title === "Starter" || []
                )
          }
          title={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.title || []
              : "Starter"
          }
        />
        {addOns?.data?.map((addOn) => (
          <PricingCard
            key={addOn.id}
            planeExists={agencySubscription?.Subscription?.active === true}
            prices={prices?.data}
            customerId={agencySubscription?.customerId || ""}
            amt={
              addOn.default_price?.unit_amount
                ? `${addOn.default_price.unit_amount / 100}`
                : "$0"
            }
            buttonCta="Subscribe"
            description="Dedicated support line & teams channel for support"
            duration="/ month"
            features={[]}
            title={"24/7 priority support"}
            highlightTitle="Get support now!"
            highlightDescription="Get priority support and skip the long long with the click of a button."
          />
        ))}
      </div>
      <h2 className="my-4 text-xl font-normal text-grayLight dark:text-grayDark">
        Payment history
      </h2>
      <Table className="border bg-card rounded-xl">
        <TableHeader className="rounded-2xl">
          <TableRow>
            <TableHead className="w-[200px]">Description</TableHead>
            <TableHead className="w-[200px]">Invoice Id</TableHead>
            <TableHead className="w-[300px]">Date</TableHead>
            <TableHead className="w-[200px]">Paid</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-medium truncate">
          {allCharges?.length === 0 && (
            <p className="mx-5 my-6">No data result</p>
          )}

          {allCharges.map((charge) => (
            <TableRow key={charge?.id}>
              <TableCell>{charge.description}</TableCell>
              <TableCell className="text-muted-foreground">
                {charge.id}
              </TableCell>
              <TableCell>{charge.date}</TableCell>
              <TableCell>
                <p
                  className={clsx("", {
                    "text-emerald-500": charge.status.toLowerCase() === "paid",
                    "text-orange-600":
                      charge.status.toLowerCase() === "pending",
                    "text-red-600": charge.status.toLowerCase() === "failed",
                  })}
                >
                  {charge?.status.toUpperCase()}
                </p>
              </TableCell>
              <TableCell className="text-right">{charge.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default BilingPage;

function SubscriptionHelper({ prices, customerId, planeExists }) {
  const searchParams = useSearch({ strict: false });
  const plan = searchParams?.plan;
  const { setOpen } = useModal();
  useEffect(() => {
    if (plan) {
      setOpen(
        <CustomModal
          title="Upgrade Plan!"
          subheading="Get started today to get access to premium features"
        >
          <SubscriptionFormWrapper
            planExists={planeExists}
            customerId={customerId}
          />
        </CustomModal>,
        async () => ({
          plans: {
            defaultPriceId: plan ? plan : "",
            planes: prices,
          },
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  return <>Subscription 124</>;
}

SubscriptionHelper.propTypes = {
  prices: PropTypes.any,
  customerId: PropTypes.string,
  planeExists: PropTypes.any,
};
