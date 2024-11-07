import supabase from "@/utils/supabase";

export async function getPipelinesFirst({ subAccountId }) {
  try {
    const { data: pipelines, error } = await supabase
      .from("Pipeline")
      .select("*")
      .eq("subAccountId", subAccountId);

    if (error) {
      throw new Error(error.message);
    }

    return pipelines;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
