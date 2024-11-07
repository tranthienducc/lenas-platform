import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetConnecttAccountStripe,
  useGetFunnel,
  useGetSubaccountDetails,
} from "@/lib/tanstack-query/queries";
import FunnelForm from "@/pages/dashboard/funnels/_components/FunnelForm";
import FunnelProductsTable from "@/pages/dashboard/funnels/_components/FunnelProductsTable";
import FunnelSteps from "@/pages/dashboard/funnels/_components/FunnelSteps";
import { Link } from "@tanstack/react-router";
import { useNavigate, useParams } from "@tanstack/react-router";
import PropTypes from "prop-types";
import { useEffect } from "react";

const FunnelsPage = () => {
  const { id, funnelId } = useParams({ strict: false });
  const navigate = useNavigate();
  const { data: funnelPages, refetch } = useGetFunnel(funnelId);

  useEffect(() => {
    if (!funnelPages) {
      navigate(`/subaccount/${id}/funnel`);
    }
  }, [funnelPages, id, navigate]);

  console.log("is-wrong?", funnelPages);

  return (
    <>
      <Link
        to={`/subaccount/${id}/funnel`}
        className="flex justify-between gap-4 mb-4 text-muted-foreground"
      >
        Back
      </Link>
      <h1 className="mb-8 text-3xl">{funnelPages?.name}</h1>
      <Tabs defaultValue="steps" className="w-full">
        <TabsList className="grid grid-cols-2 w-[50%] bg-transparent">
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="steps">
          <FunnelSteps
            funnel={funnelPages}
            subAccountId={id}
            pages={funnelPages?.FunnelPage}
            funnelId={funnelId}
            refetch={refetch}
          />
        </TabsContent>
        <TabsContent value="settings">
          <FunnelSettings subAccountId={id} prevData={funnelPages} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default FunnelsPage;

function FunnelSettings({ subAccountId, prevData }) {
  const { data: subAccountDetails } = useGetSubaccountDetails(subAccountId);
  const { data: products } = useGetConnecttAccountStripe(
    subAccountDetails?.connectAccountId
  );

  return (
    <div className="flex gap-4 flex-col xl:!flex-row">
      <Card>
        <CardHeader>
          <CardTitle>FunnelProducts</CardTitle>
          <CardDescription>
            Select the products and services you wish to sell on this funnel.
            You can sell one time and recurring products too.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <>
            {subAccountDetails?.connectAccountId ? (
              <FunnelProductsTable prevData={prevData} products={products} />
            ) : (
              "Connect your stripe account to sell products."
            )}
          </>
        </CardContent>
      </Card>

      <FunnelForm subAccountId={subAccountId} prevData={prevData} />
    </div>
  );
}

FunnelSettings.propTypes = {
  subAccountId: PropTypes.string,
  prevData: PropTypes.any,
};
