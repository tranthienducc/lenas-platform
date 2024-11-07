import supabase from "@/utils/supabase";

export async function getUserPermission(userId) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
      Permissions (
        id,
        access,
        subAccountId,
        SubAccount (
          id,
          name
        )
      )
    `
      )
      .eq("user_id", userId);

    // Check for errors in Supabase query
    if (error) {
      console.error("Supabase error:", error);
      return { error: error.message };
    }

    // Log the Supabase response
    console.log("Supabase response:", data);

    // Return the fetched data
    return data;
  } catch (error) {
    // Xử lý các lỗi không mong đợi
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
