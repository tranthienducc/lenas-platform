import supabase from "@/utils/supabase";

export async function changePassword({ email, password }) {
  try {
    // Đăng ký người dùng qua Supabase Authentication
    const { data, error: signUpError } = await supabase.auth.updateUser({
      email: email,
      password: password,
    });

    console.log("Supabase response:", { data, signUpError });

    // Nếu có lỗi khi đăng ký, xử lý và trả về lỗi
    if (signUpError) {
      console.error("Supabase error during sign-up:", signUpError);
      return { error: signUpError.message };
    }

    // Trả về dữ liệu nếu thành công
    return data;
  } catch (error) {
    // Xử lý các lỗi không mong đợi
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
