import supabase from "@/utils/supabase";

export async function deleteFunnelPage(funnelPageId) {
  try {
    const { data: funnelPage, error: funnelPageError } = await supabase
      .from("FunnelPage")
      .delete()
      .eq("id", funnelPageId);

    if (funnelPageError) {
      console.error("Supabase error:", funnelPageError);
      return { error: funnelPageError.message };
    }

    return funnelPage;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
