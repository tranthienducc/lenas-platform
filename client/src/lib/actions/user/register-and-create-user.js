import supabase from "@/utils/supabase";

export async function registerAndCreateUser({ agencyId, userId }) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ agencyId: agencyId })
      .eq("user_id", userId);
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
