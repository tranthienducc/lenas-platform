import SubscriptionFormWrapper from "@/components/forms/SubscriptionForm/SubscriptionFormWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomModal from "@/pages/subaccount/pipelines/_components/CustomModal";
import { useModal } from "@/providers/modal-provider";
import { useSearch } from "@tanstack/react-router";
import PropTypes from "prop-types";

const PricingCard = ({
  amt,
  buttonCta,
  customerId,
  description,
  duration,
  features,
  highlightDescription,
  highlightTitle,
  planExists,
  prices,
  title,
}) => {
  const searchParams = useSearch({ strict: false });
  const plan = searchParams?.plan;
  const { setOpen } = useModal();

  const handleManagePlan = async () => {
    setOpen(
      <CustomModal
        title={"Manage Your Plan"}
        subheading="You can change your plan at any time from the billings settings"
      >
        <SubscriptionFormWrapper
          customerId={customerId}
          planExists={planExists}
        />
      </CustomModal>,
      {
        plans: {
          defaultPriceId: plan || "",
          plans: prices,
        },
      }
    );
  };

  return (
    <Card className="flex flex-col justify-between lg:w-1/2">
      <CardHeader className="flex flex-col lg:!flex-row justify-between">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <p className="text-6xl font-bold">
          {amt}
          <small className="text-xs font-light text-muted-foreground">
            {duration}
          </small>
        </p>
      </CardHeader>
      <CardContent>
        <ul>
          {Array.isArray(features) ? (
            features?.map((feature) => (
              <li
                key={feature?.id}
                className="ml-4 list-disc text-muted-foreground"
              >
                {feature}
              </li>
            ))
          ) : (
            <p>No data result</p>
          )}
        </ul>
      </CardContent>
      <CardFooter>
        <Card className="w-full">
          <div className="flex flex-col md:!flex-row items-center justify-between rounded-lg border gap-4 p-4">
            <p>{highlightTitle}</p>
            <p className="text-sm text-muted-foreground">
              {highlightDescription}
            </p>

            <Button className="w-full md:w-fit" onClick={handleManagePlan}>
              {buttonCta}
            </Button>
          </div>
        </Card>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;

PricingCard.propTypes = {
  amt: PropTypes.string,
  buttonCta: PropTypes.string,
  customerId: PropTypes.string,
  description: PropTypes.string,
  duration: PropTypes.string,
  features: PropTypes.array,
  highlightDescription: PropTypes.string,
  highlightTitle: PropTypes.string,
  planExists: PropTypes.bool,
  prices: PropTypes.array,
  title: PropTypes.string,
};
