import supabase from "@/utils/supabase";

export async function getCurrentUser() {
  try {
    // Lấy phiên đăng nhập hiện tại
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Error fetching session:", sessionError);
      return { error: sessionError.message };
    }

    // Nếu không có phiên đăng nhập, trả về null hoặc thông báo lỗi
    if (!session) {
      console.error("No active session found.");
      return null; // Hoặc { error: "No active session." }
    }

    // Lấy thông tin người dùng
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
      return { error: userError.message };
    }

    return user; // Trả về thông tin người dùng hiện tại
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
