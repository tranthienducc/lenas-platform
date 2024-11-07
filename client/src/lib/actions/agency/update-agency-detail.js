import supabase from "@/utils/supabase";

export async function updateAgencyDetail({ agencyId, agencyDetails }) {
  try {
    const { data, error } = await supabase
      .from("agency")
      .update(agencyDetails)
      .eq("id", agencyId);

    console.log("Supabase response:", { data, error });

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
