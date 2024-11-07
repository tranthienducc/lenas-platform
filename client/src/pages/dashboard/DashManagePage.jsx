import CircleProgess from "@/components/common/CircleProgess";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { stripe } from "@/lib/stripe";
import {
  useGetAgencyId,
  useGetCollectSubAccount,
} from "@/lib/tanstack-query/queries";
import { Link, useParams } from "@tanstack/react-router";
import { AreaChart } from "@tremor/react";
import {
  ClipboardIcon,
  Contact2,
  DollarSign,
  Goal,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";

const DashManagePage = () => {
  const { id } = useParams({ strict: false });
  const [currency, setCurrency] = useState("USD");
  const [sessions, setSessions] = useState([]);
  const [totalClosedSessions, setTotalClosedSessions] = useState([]);
  const [totalPendingSessions, setTotalPendingSessions] = useState([]);
  const [net, setNet] = useState(0);
  const [potentialIncome, setPotentialIncome] = useState(0);
  const [closingRate, setClosingRate] = useState(0);

  const currentYear = new Date().getFullYear();
  const startDate = new Date(`${currentYear}-01-01T00:00:00Z`).getTime() / 1000;
  const endDate = new Date(`${currentYear}-12-31T23:59:59Z`).getTime() / 1000;

  const { data: agencyDetails } = useGetAgencyId(id);
  const { data: subaccounts } = useGetCollectSubAccount(id);

  useEffect(() => {
    const fetchData = async () => {
      if (!agencyDetails) return;

      if (agencyDetails?.connectAccountId) {
        const response = await stripe.accounts.retrieve({
          stripeAccount: agencyDetails?.connectAccountId,
        });
        setCurrency(response.default_currency?.toUpperCase() || "USD");

        const checkoutSession = await stripe.checkout.sessions.list(
          { created: { gte: startDate, lte: endDate }, limit: 100 },
          { stripeAccount: agencyDetails?.connectAccountId }
        );

        const sessionData = checkoutSession?.data?.map((session) => ({
          ...session,
          created: new Date(session.created).toLocaleDateString(),
          amount_total: session?.amount_total ? session.amount_total / 100 : 0,
        }));
        setSessions(sessionData);

        const closedSessions = sessionData?.filter(
          (session) => session.status === "complete"
        );
        setTotalClosedSessions(closedSessions);

        const pendingSessions = sessionData?.filter(
          (session) => session.status === "open" || session.status === "expired"
        );
        setTotalPendingSessions(pendingSessions);

        const netAmount = closedSessions
          .reduce((total, session) => total + (session.amount_total || 0), 0)
          .toFixed(2);
        setNet(+netAmount);

        const potentialAmount = pendingSessions
          .reduce((total, session) => total + (session.amount_total || 0), 0)
          .toFixed(2);
        setPotentialIncome(+potentialAmount);

        const closingRateValue = (
          (closedSessions.length / checkoutSession.data.length) *
          100
        ).toFixed(2);
        setClosingRate(+closingRateValue);
      }
    };

    fetchData();
  }, [agencyDetails, startDate, endDate]);

  return (
    <div className="relative h-full">
      {!agencyDetails?.connectAccountId && (
        <div className="absolute bottom-0 right-0 z-30 flex items-center justify-center -top-10 -left-10 backdrop-blur-md bg-background/50">
          <Card>
            <CardHeader>
              <CardTitle>Connect Your Stripe</CardTitle>
              <CardDescription>
                You need to connect your stripe account to see metrics
              </CardDescription>
              <Link
                href={`/agency/${agencyDetails?.id}/launchpad`}
                className="flex items-center gap-2 p-2 text-white rounded-md w-fit bg-secondary"
              >
                <ClipboardIcon />
                Launch Pad
              </Link>
            </CardHeader>
          </Card>
        </div>
      )}
      <h1 className="text-4xl">Dashboard</h1>
      <Separator className="my-6 " />
      <div className="flex flex-col gap-4 pb-6">
        <div className="flex gap-4 flex-col xl:!flex-row">
          <Card className="relative flex-1">
            <CardHeader>
              <CardDescription>Income</CardDescription>
              <CardTitle className="text-4xl">
                {net ? `${currency} ${net.toFixed(2)}` : `$0.00`}
              </CardTitle>
              <small className="text-xs text-muted-foreground">
                For the year {currentYear}
              </small>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Total revenue generated as reflected in your stripe dashboard.
            </CardContent>
            <DollarSign className="absolute right-4 top-4 text-muted-foreground" />
          </Card>
          <Card className="relative flex-1">
            <CardHeader>
              <CardDescription>Potential Income</CardDescription>
              <CardTitle className="text-4xl">
                {potentialIncome
                  ? `${currency} ${potentialIncome.toFixed(2)}`
                  : `$0.00`}
              </CardTitle>
              <small className="text-xs text-muted-foreground">
                For the year {currentYear}
              </small>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              This is how much you can close.
            </CardContent>
            <DollarSign className="absolute right-4 top-4 text-muted-foreground" />
          </Card>
          <Card className="relative flex-1">
            <CardHeader>
              <CardDescription>Active Clients</CardDescription>
              <CardTitle className="text-4xl">{subaccounts?.length}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Reflects the number of sub accounts you own and manage.
            </CardContent>
            <Contact2 className="absolute right-4 top-4 text-muted-foreground" />
          </Card>
          <Card className="relative flex-1">
            <CardHeader>
              <CardTitle>Agency Goal</CardTitle>
              <CardDescription>
                <p className="mt-2">
                  Reflects the number of sub accounts you want to own and
                  manage.
                </p>
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Current: {subaccounts?.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Goal: {agencyDetails?.goal}
                  </span>
                </div>
                <Progress
                  value={(subaccounts?.length / agencyDetails?.goal) * 100}
                />
              </div>
            </CardFooter>
            <Goal className="absolute right-4 top-4 text-muted-foreground" />
          </Card>
        </div>
        <div className="flex gap-4 xl:!flex-row flex-col">
          <Card className="flex-1 p-4">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <AreaChart
              className="text-sm stroke-primary"
              data={[
                ...(totalClosedSessions || []),
                ...(totalPendingSessions || []),
              ]}
              index="created"
              categories={["amount_total"]}
              colors={["primary"]}
              yAxisWidth={30}
              showAnimation={true}
            />
          </Card>
          <Card className="xl:w-[400px] w-full">
            <CardHeader>
              <CardTitle>Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <CircleProgess
                value={closingRate}
                description={
                  <>
                    {sessions && (
                      <div className="flex flex-col">
                        Abandoned
                        <div className="flex gap-2">
                          <ShoppingCart className="text-rose-700" />
                          {sessions?.length}
                        </div>
                      </div>
                    )}
                    {totalClosedSessions && (
                      <div className="flex-col felx">
                        Won Carts
                        <div className="flex gap-2">
                          <ShoppingCart className="text-emerald-700" />
                          {totalClosedSessions?.length}
                        </div>
                      </div>
                    )}
                  </>
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashManagePage;
