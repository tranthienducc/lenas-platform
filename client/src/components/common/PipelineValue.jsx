import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPipelines } from "@/lib/actions/pipelines/get-pipelines";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";

const PipelineValue = ({ subaccountId }) => {
  const [pipelines, setPipelines] = useState([]);
  const [selectedPipelineId, setSelectedPipelineId] = useState("");
  const [pipelineClosedValue, setPipelineClosedValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPipelines(subaccountId);
      setPipelines(res);
      setSelectedPipelineId(res?.[0]?.id);
    };
    fetchData();
  }, [subaccountId]);

  const totalPipelineValue = useMemo(() => {
    if (pipelines?.length) {
      return (
        pipelines
          ?.find((pipeline) => pipeline?.id === selectedPipelineId)
          ?.Lane?.reduce((totalLanes, currentLastIndex, lane, array) => {
            const laneTicketsTotal = lane?.Tickets.reduce(
              (totalTickets, ticket) => totalTickets + Number(ticket?.value),
              0
            );
            if (currentLastIndex === array.length - 1) {
              setPipelineClosedValue(laneTicketsTotal || 0);
              return totalLanes;
            }
            return totalLanes + laneTicketsTotal;
          }, 0) || 0
      );
    }
    return 0;
  }, [pipelines, selectedPipelineId]);

  const pipelineRate = useMemo(() => {
    (pipelineClosedValue / (totalPipelineValue + pipelineClosedValue)) * 100;
  }, [pipelineClosedValue, totalPipelineValue]);

  return (
    <Card className="relative w-full xl:w-[350px]">
      <CardHeader>
        <CardDescription>Pipeline Value</CardDescription>
        <small className="text-xs text-muted-foreground">
          Pipeline Progress
        </small>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Closed {pipelineClosedValue}
          </p>
          <p className="text-xs text-muted-foreground">
            Total {totalPipelineValue + pipelineClosedValue}
          </p>
        </div>
        <Progress color="green" value={pipelineRate} className="h-2" />
      </CardHeader>
      <CardContent className="textsm text-muted-foreground">
        <p className="mb-2">
          Total value of all tickets in the given pipeline except the last lane.
          Your last lane is considered your closing lane in every pipeline.
        </p>
        <Select
          value={selectedPipelineId}
          onValueChange={setSelectedPipelineId}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a pipeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Pipelines</SelectLabel>
              {pipelines?.map((pipeline) => (
                <SelectItem key={pipeline?.id} value={pipeline.id}>
                  {pipeline.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default PipelineValue;

PipelineValue.propTypes = {
  subaccountId: PropTypes.string,
};
