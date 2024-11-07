import { getCurrentUser } from "@/lib/actions/user/get-current-user";
import supabase from "@/utils/supabase";

export async function getAuthUserDetail() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
      *,
        agency (
          *,
          SubAccount (*)
        ),
        Permissions (*)
      `
      )
      .eq("email", user.email)
      .single();
    // Check for errors in Supabase query

    if (error) {
      return { error: error.message };
    }

    // Log the Supabase response

    // Return the fetched data
    return data;
  } catch (error) {
    // Xử lý các lỗi không mong đợi
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
