import supabase from "@/utils/supabase";

export async function getTagsForSubaccount(subAccountId) {
  try {
    const { data, error } = await supabase
      .from("Tag")
      .select("*")
      .eq("subAccountId", subAccountId);

    if (error) {
      throw new Error(`Error fetching tags for subaccount: ${error.message}`);
    }

    return data; // Trả về danh sách các tag
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
