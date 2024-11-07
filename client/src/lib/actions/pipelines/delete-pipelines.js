import supabase from "@/utils/supabase";

export async function deletePipelines(pipelineId) {
  try {
    const { data: pipelines, error: pipelinesError } = await supabase
      .from("Pipeline")
      .delete()
      .eq("id", pipelineId);

    if (pipelinesError) {
      console.error("Supabase error:", pipelinesError);
      return { error: pipelinesError.message };
    }

    return pipelines;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
