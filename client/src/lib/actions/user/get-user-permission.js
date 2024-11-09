import supabase from "@/utils/supabase";

export async function getUserPermission({ userId }) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        *,
      Permissions (*)
    `
      )
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase error:", error);
      return { error: error.message };
    }

    console.log("Supabase response:", data);

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
