import supabase from "@/utils/supabase";

export async function getAgencyBySub({ agencyId }) {
  try {
    const { data, error } = await supabase
      .from("agency")
      .select(
        `
      *,
      SubAccount(*)
    `
      )
      .eq("id", agencyId)
      .single();

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
