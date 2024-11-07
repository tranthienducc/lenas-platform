import supabase from "@/utils/supabase";

export async function updateVisitsFunnelPage(funnelPageId) {
  try {
    // Đầu tiên lấy giá trị visits hiện tại
    const { data: currentPage, error: fetchError } = await supabase
      .from("FunnelPage")
      .select("visits")
      .eq("id", funnelPageId)
      .single();

    if (fetchError) {
      throw new Error(`Error fetching funnel page: ${fetchError.message}`);
    }

    // Sau đó cập nhật với giá trị visits + 1
    const { data: updatedPage, error: updateError } = await supabase
      .from("FunnelPage")
      .update({ visits: (currentPage.visits || 0) + 1 })
      .eq("id", funnelPageId)
      .select();

    if (updateError) {
      throw new Error(`Error updating funnel visits: ${updateError.message}`);
    }

    return updatedPage;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
