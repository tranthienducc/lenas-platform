import { useGetPipelinesFirst } from "@/lib/tanstack-query/queries";
import { cn } from "@/lib/utils";
import DialogCreatePipelines from "@/pages/subaccount/pipelines/_components/DialogCreatePipelines";

import { Link, useParams } from "@tanstack/react-router";

const Pipeline = () => {
  const { id } = useParams({ strict: false });
  const { data: pipelines, refetch } = useGetPipelinesFirst(id);

  const colors = ["#d5f980", "#a2bbe7", "#f2bae2", "#66e9fa"];

  console.log(
    "pipelines",
    pipelines?.map((pipeline) => pipeline?.id)
  );

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-medium">Pipelines</h1>
        <DialogCreatePipelines subAccountId={id} refetch={refetch} />
      </div>
      <ul className="grid grid-cols-6 list-none gap-7">
        {pipelines?.map((pipeline, index) => (
          <li
            key={pipeline?.id}
            className={cn("rounded-xl px-5 py-1 w-fit", {
              [`bg-[${colors[index % colors.length]}]`]: true,
            })}
          >
            <Link
              to={`/subaccount/${id}/pipeline/${pipeline?.id}`}
              className="font-medium text-black"
            >
              {pipeline?.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pipeline;
