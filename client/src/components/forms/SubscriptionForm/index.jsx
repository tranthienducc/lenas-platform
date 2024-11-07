import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import IconsLoading from "@/components/icons/IconsLoading";

const SubscriptionForm = ({ selectedPriceId }) => {
  const elements = useElements();
  const stripeHook = useStripe();
  const [priceError, setPriceError] = useState("");

  const handleSubmit = async (event) => {
    if (!selectedPriceId) {
      setPriceError("You need to select a plan to subscribe.");
      return;
    }
    setPriceError("");
    event.preventDefault();

    if (!stripeHook || !elements) return;

    try {
      const { error } = await stripeHook.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${import.meta.env.VITE_PUBLIC_URL}/dashboard`,
        },
      });

      if (error) {
        throw new Error();
      }

      toast("Payment successfull", {
        description: "Your payment has been successfully processed.",
      });
    } catch (error) {
      console.log(error);
      toast("Payment failed", {
        description:
          "We couldnt process your payment. Please try a different card",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <small className="text-destructive">{priceError}</small>
      <PaymentElement />

      <Button disabled={!stripeHook} className="w-full mt-4">
        {!stripeHook ? <IconsLoading /> : "Submit"}
      </Button>
    </form>
  );
};

export default SubscriptionForm;

SubscriptionForm.propTypes = {
  selectedPriceId: PropTypes.string,
};
