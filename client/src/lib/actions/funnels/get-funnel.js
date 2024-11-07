import supabase from "@/utils/supabase";

export async function getFunnel(funnelId) {
  try {
    // Lấy thông tin Funnel và sắp xếp các FunnelPage theo thứ tự tăng dần của 'order'
    const { data: funnel, error } = await supabase
      .from("Funnel")
      .select(
        `
      *,
      FunnelPage (
        *,
        order
      )
    `
      )
      .eq("id", funnelId)
      .single();

    if (error) {
      throw new Error(`Error fetching funnel: ${error.message}`);
    }

    if (funnel && funnel.FunnelPages) {
      funnel.FunnelPages.sort((a, b) => a?.order - b?.order);
    }
    return funnel;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
