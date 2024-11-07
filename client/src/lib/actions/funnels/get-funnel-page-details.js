import supabase from "@/utils/supabase";

export async function getFunnelPage(funnelPageId) {
  try {
    const { data: funnelPage, error } = await supabase
      .from("FunnelPage")
      .select("*")
      .eq("id", funnelPageId)
      .single();

    if (error) {
      throw new Error(`Error fetching funnelPage: ${error.message}`);
    }

    return funnelPage;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
