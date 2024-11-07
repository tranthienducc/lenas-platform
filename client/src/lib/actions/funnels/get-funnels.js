import supabase from "@/utils/supabase";

export async function getFunnels({ subAccountId }) {
  try {
    const { data: funnels, error } = await supabase
      .from("Funnel")
      .select(
        `
      *,
      FunnelPage (*)
    `
      )
      .eq("subAccountId", subAccountId);

    if (error) {
      throw new Error(`Error fetching funnels: ${error.message}`);
    }

    return funnels;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
