import supabase from "@/utils/supabase";

export async function updateAgencyStripeAccount({
  agencyId,
  connectAccountId,
}) {
  try {
    const { data, error } = await supabase
      .from("agency")
      .update({ connectAccountId: connectAccountId })
      .eq("id", agencyId);
    console.log("agencyId", agencyId);

    if (error) {
      console.error("Supabase error:", error);
      return { error: error.message };
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
