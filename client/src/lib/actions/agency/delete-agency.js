import supabase from "@/utils/supabase";

export async function deleteAgency(agencyId) {
  try {
    const { data: agency, error: agencyError } = await supabase
      .from("agency")
      .delete()
      .eq("id", agencyId);

    if (agencyError) {
      console.error("Supabase error:", agencyError);
      return { error: agencyError.message };
    }

    return agency;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
