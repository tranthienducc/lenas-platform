import supabase from "@/utils/supabase";

export async function getAgencyById({ agencyId }) {
  try {
    const { data, error } = await supabase
      .from("agency")
      .select("*")
      .eq("id", agencyId)
      .single();

    console.log("Supabase response:", { data, agencyId, error });

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
