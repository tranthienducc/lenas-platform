import supabase from "@/utils/supabase";

export async function getAgencyByUser({ agencyId }) {
  try {
    const { data, error } = await supabase
      .from("agency")
      .select("*")
      .eq("id", agencyId);

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
