import supabase from "@/utils/supabase";

export async function getPipelinesDetails({ pipelineId }) {
  try {
    const { data: pipelines, error: pipelinesError } = await supabase
      .from("Pipeline")
      .select("*")
      .eq("id", pipelineId)
      .single();

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
