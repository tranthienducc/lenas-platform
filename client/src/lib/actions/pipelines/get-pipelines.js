import supabase from "@/utils/supabase";

export async function getPipelines(subaccountId) {
  try {
    const { data, error } = await supabase
      .from("Pipeline")
      .select(
        `
        *,
        Lane (
          *,
          Ticket (*)
        )
      `
      )
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
