import supabase from "@/utils/supabase";

export async function getCollectSubAccount({ agencyId }) {
  try {
    const { data: subAccountData, error: subAccountError } = await supabase
      .from("SubAccount")
      .select("*")
      .eq("agencyId", agencyId);

    if (subAccountError) {
      console.error("Supabase error:", subAccountError);
      return { error: subAccountError.message };
    }

    return subAccountData;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
