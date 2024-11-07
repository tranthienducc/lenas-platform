import BlurPage from "@/components/common/BlurPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stripe } from "@/lib/stripe";
import {
  useGetFunnels,
  useGetSubaccountDetails,
} from "@/lib/tanstack-query/queries";
import { Link, useParams } from "@tanstack/react-router";
import {
  ClipboardIcon,
  Contact2,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AreaChart, BadgeDelta } from "@tremor/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import SubaccountFunnelChart from "@/components/common/SubaccountFunnelChart";
import PipelineValue from "@/components/common/PipelineValue";
import CircleProgess from "@/components/common/CircleProgess";

const DashboardSub = () => {
  const { id } = useParams({ strict: false });
  const [currency, setCurrency] = useState("USD");
  const [sessions, setSessions] = useState([]);
  const [totalClosedSessions, setTotalClosedSessions] = useState([]);
  const [totalPendingSessions, setTotalPendingSessions] = useState([]);
  const [net, setNet] = useState(0);
  const [potentialIncome, setPotentialIncome] = useState(0);
  const [closingRate, setClosingRate] = useState(0);
  const { data: subAccountDetail } = useGetSubaccountDetails(id);
  const { data: funnels } = useGetFunnels(id);

  const funnelsPerformanceMetrics = funnels?.map((funnel) => ({
    ...funnel,
    totalFunnelVisits: funnel?.[0]?.FunnelPages?.reduce(
      (total, page) => total + page?.visits,
      0
    ),
  }));

  const currentYear = new Date().getFullYear();
  const startDate = new Date(`${currentYear}-01-01T00:00:00Z`).getTime() / 1000;
  const endDate = new Date(`${currentYear}-12-31T23:59:59Z`).getTime() / 1000;

  useEffect(() => {
    const fetchData = async () => {
      if (!subAccountDetail) return;

      if (subAccountDetail?.connectAccountId) {
        const response = await stripe.accounts.retrieve({
          stripeAccount: subAccountDetail?.connectAccountId,
        });
        setCurrency(response.default_currency?.toUpperCase() || "USD");

        const checkoutSession = await stripe.checkout.sessions.list(
          { created: { gte: startDate, lte: endDate }, limit: 100 },
          { stripeAccount: subAccountDetail?.connectAccountId }
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
  }, [subAccountDetail, startDate, endDate]);

  return (
    <BlurPage>
      <div className="relative h-full">
        {!subAccountDetail?.connectAccountId && (
          <div className="absolute -top-10 -left-10 right-0 bottom-0 z-30 flex items-center justify-center backdrop-blur-md bg-background/50">
            <Card>
              <CardHeader>
                <CardTitle>Connect Your Stripe</CardTitle>
                <CardDescription>
                  {" "}
                  You need to connect your stripe account to see metrics
                </CardDescription>
                <Link
                  href={`/subaccount/${subAccountDetail?.id}/launchpad`}
                  className="p-2 w-fit bg-secondary text-white rounded-md flex items-center gap-2"
                >
                  <ClipboardIcon />
                  Launch Pad
                </Link>
              </CardHeader>
            </Card>
          </div>
        )}
        <div className="flex flex-col gap-4 pb-6">
          <div className="flex gap-4 flex-col xl:!flex-row">
            <Card className="flex-1 relative">
              <CardHeader>
                <CardTitle className="text-4xl">
                  {net ? `${currency} ${net.toFixed(2)}` : `$0.00`}
                </CardTitle>
                <CardDescription>Income</CardDescription>
                <small className="text-xs text-muted-foreground">
                  For the year {currentYear}
                </small>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Total revenue generated as reflected in your stripe dashboard.
              </CardContent>
              <DollarSign className="absolute right-4 top-4 text-muted-foreground" />
            </Card>
            <Card className="flex-1 relative">
              <CardHeader>
                <CardTitle className="text-4xl">
                  {potentialIncome
                    ? `${currency} ${potentialIncome.toFixed(2)}`
                    : `$0.00`}
                </CardTitle>
                <CardDescription>Potential Income</CardDescription>
                <small className="text-xs text-muted-foreground">
                  For the year {currentYear}
                </small>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                This is how much you can close.
              </CardContent>
              <Contact2 className="absolute right-4 top-4 text-muted-foreground" />
            </Card>
            <PipelineValue subaccountId={id} />

            <Card className="xl:w-fit">
              <CardHeader>
                <CardDescription>Conversions</CardDescription>
                <CircleProgess
                  value={closingRate}
                  description={
                    <>
                      {sessions && (
                        <div className="flex flex-col">
                          Total Carts Opened
                          <div className="flex gap-2">
                            <ShoppingCart className="text-rose-700" />
                            {sessions?.length}
                          </div>
                        </div>
                      )}
                      {totalClosedSessions && (
                        <div className="flex flex-col">
                          Won Carts
                          <div className="flex gap-2">
                            <ShoppingCart className="text-emerald-700" />
                            {totalClosedSessions.length}
                          </div>
                        </div>
                      )}
                    </>
                  }
                />
              </CardHeader>
            </Card>
          </div>

          <div className="flex gap-4 flex-col xl:!flex-row">
            <Card className="relative">
              <CardHeader>
                <CardDescription>Funnel Performance</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground flex flex-col gap-12 justify-between">
                <SubaccountFunnelChart data={funnelsPerformanceMetrics} />
                <div className="lg:w-[150px]">
                  Total page visits across all funnels. Hover over to get more
                  details on funnel page performance.
                </div>
              </CardContent>
              <Contact2 className="absolute right-4 top-4 text-muted-foreground" />
            </Card>
            <Card className="p-4 flex-1">
              <CardHeader>
                <CardTitle>Checkout Activity</CardTitle>
              </CardHeader>
              <AreaChart
                className="text-sm stroke-primary"
                data={sessions || []}
                index="created"
                categories={["amount_total"]}
                colors={["primary"]}
                yAxisWidth={30}
                showAnimation={true}
              />
            </Card>
          </div>

          <div className="flex flex-col gap-4 xl:!flex-row">
            <Card className="p-4 flex-1 h-[450px] overflow-scroll relative">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Transition History
                  <BadgeDelta
                    className="rounded-xl bg-transparent"
                    deltaType="moderateIncrease"
                    isIncreasePositive={true}
                    size="xs"
                  >
                    +12.3%
                  </BadgeDelta>
                </CardTitle>
                <Table>
                  <TableHeader className="!sticky !top-0">
                    <TableRow>
                      <TableHead className="w-[300px]">Email</TableHead>
                      <TableHead className="w-[200px]">Status</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="font-medium truncate">
                    {totalClosedSessions
                      ? totalClosedSessions.map((session) => (
                          <TableRow key={session.id}>
                            <TableCell>
                              {session.customer_details?.email || "-"}
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-emerald-500 dark:text-black">
                                Paid
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(session?.created).toUTCString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <small>{currency}</small>
                              <span className="text-emerald-500">
                                {session?.amount_total}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      : "No data"}
                  </TableBody>
                  <TableBody className="font-medium truncate">
                    {totalPendingSessions
                      ? totalPendingSessions.map((session) => (
                          <TableRow key={session.id}>
                            <TableCell>
                              {session.customer_details?.email || "-"}
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-emerald-500 dark:text-black">
                                Paid
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(session?.created).toUTCString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <small>{currency}</small>
                              <span className="text-emerald-500">
                                {session?.amount_total}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      : "No data"}
                  </TableBody>
                </Table>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </BlurPage>
  );
};

export default DashboardSub;
