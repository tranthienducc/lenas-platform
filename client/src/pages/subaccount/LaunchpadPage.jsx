import IconsVercel from "@/components/icons/IconsVercel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateAgencyStripeAccount } from "@/lib/actions/agency/update-agency-stripe-acc";
import { stripe } from "@/lib/stripe";
import { useGetSubaccountDetails } from "@/lib/tanstack-query/queries";
import { getStripeOAuthLink } from "@/lib/utils";
import { Link, useParams, useSearch } from "@tanstack/react-router";
import { CheckCircleIcon } from "lucide-react";
import { useEffect } from "react";

const LaunchpadPage = () => {
  const { id } = useParams({ strict: false });
  const searchParams = useSearch({ strict: false });
  const { data: subAccountDetails } = useGetSubaccountDetails(id);

  let connectStripeAccount = false;

  useEffect(() => {
    const handleStripeOAuth = async () => {
      if (searchParams?.code) {
        if (!subAccountDetails?.connectAccountId) {
          try {
            const response = await stripe.oauth.token({
              grant_type: "authorization_code",
              code: searchParams.code,
            });
            await updateAgencyStripeAccount({
              agencyId: id,
              connectAccountId: response.stripe_user_id,
            });
            connectStripeAccount = true;
          } catch (error) {
            console.log(error, "Could not connect stripe account");
          }
        }
      }
    };

    handleStripeOAuth();
  }, [searchParams, subAccountDetails]);

  if (!subAccountDetails) return;

  const subAccountExists =
    subAccountDetails.name &&
    subAccountDetails.address &&
    subAccountDetails.subAccountLogo &&
    subAccountDetails.city &&
    subAccountDetails.companyPhone &&
    subAccountDetails.companyEmail &&
    subAccountDetails.zipCode &&
    subAccountDetails.state &&
    subAccountDetails.country;

  const stripeOAuthLink = getStripeOAuthLink(
    "dashboard",
    `launchpad___${subAccountDetails.id}`
  );

  console.log("id", subAccountExists);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full h-full max-w-[800px]">
        <Card className="border-none bg-[#000]">
          <CardHeader>
            <CardTitle>Let get started</CardTitle>
            <CardDescription className="text-grayLight dark:text-grayDark">
              {" "}
              Follow the steps below to get your account setup.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between w-full gap-2 p-4 border border-white/15 rounded-xl">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <IconsVercel className="object-contain rounded-md size-20" />

                <p className="text-grayLight dark:text-grayDark">
                  site domain powered by Vercel, make a difference
                </p>
              </div>
              <Button type="button">Start</Button>
            </div>
            <div className="flex items-center justify-between w-full gap-2 p-4 border border-white/15 rounded-xl">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <img
                  src="/assets/icons/stripelogo.png"
                  alt="device"
                  className="object-contain rounded-md size-20"
                />
                <p className="text-grayLight dark:text-grayDark">
                  {" "}
                  Connect your stripe account to accept payments and see your
                  dashboard.
                </p>
              </div>
              {subAccountDetails?.connectAccountId || connectStripeAccount ? (
                <CheckCircleIcon
                  size={50}
                  className="flex-shrink-0 p-2 text-primary"
                />
              ) : (
                <Link
                  to={stripeOAuthLink}
                  className="px-4 py-2 text-white bg-black rounded-md dark:text-black dark:bg-primary"
                >
                  Start
                </Link>
              )}
            </div>
            <div className="flex items-center justify-between w-full gap-2 p-4 border border-white/15 rounded-xl">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <img
                  src={subAccountDetails.subAccountLogo}
                  alt="subaccount-logo"
                  className="object-contain rounded-md size-20"
                />
                <p className="text-grayLight dark:text-grayDark">
                  Fill in all your bussiness details.
                </p>
              </div>
              {subAccountExists ? (
                <CheckCircleIcon
                  size={50}
                  className="flex-shrink-0 p-2 text-primary"
                />
              ) : (
                <Link
                  to={`/dashboard/${id}/setting`}
                  className="px-4 py-2 text-white rounded-md bg-primary"
                >
                  Start
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaunchpadPage;
