import supabase from "@/utils/supabase";

export async function getAllPipelines(subaccountId) {
  try {
    const { data, error } = await supabase
      .from("Pipeline")
      .select("*")
      .eq("subAccountId", subaccountId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
