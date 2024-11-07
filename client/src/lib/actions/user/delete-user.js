import supabase from "@/utils/supabase";

export async function deleteUser(id) {
  try {
    // Đăng ký người dùng qua Supabase Authentication

    const { data: users, error: usersError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id);

    if (usersError) {
      console.error("Error deleting from profiles:", usersError);
      return { error: usersError.message };
    }

    const { error: authError } = await supabase.auth.admin.deleteUser(id);

    if (authError) {
      console.error("Error deleting user from authentication:", authError);
      return { error: authError.message };
    }

    console.log("User deleted successfully from both profiles and auth.");

    return users;
  } catch (error) {
    // Xử lý các lỗi không mong đợi
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
