import supabase from "@/utils/supabase";

export async function getDomainContent({ subDomainName }) {
  try {
    const { data: funnel, error } = await supabase
      .from("Funnel")
      .select(
        `
      *,
      FunnelPage (
        id,
        name,
        pathName,
        content,
        order,
        previewImage
      )
    `
      )
      .eq("subDomainName", subDomainName)
      .single();

    if (error) {
      throw new Error(`Error fetching funnel: ${error.message}`);
    }

    return funnel;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
