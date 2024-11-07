import supabase from "@/utils/supabase";

export async function updateFunnelProducts(products, funnelId) {
  try {
    const { data: funnelProduct, error: funnelProductError } = await supabase
      .from("Funnel")
      .update({ liveProducts: products })
      .eq("id", funnelId);

    if (funnelProductError) {
      throw new Error(
        `Error updating funnel products: ${funnelProductError.message}`
      );
    }

    return funnelProduct;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
