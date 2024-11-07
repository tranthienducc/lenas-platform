import supabase from "@/utils/supabase";

export async function createUsers({ email, password }) {
  try {
    // Đăng ký người dùng qua Supabase Authentication
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log("Supabase response:", { data, signUpError });

    // Nếu có lỗi khi đăng ký, xử lý và trả về lỗi
    if (signUpError) {
      console.error("Supabase error during sign-up:", signUpError);
      return { error: signUpError.message };
    }

    const { error: profileError } = await supabase.from("profiles").insert([
      {
        user_id: data.user.id,
        role: "SUBACCOUNT_USER",
        email: data.user.email,
        firstName: "John",
        lastName: "Doe",
        username: "Jon Doe",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);

    // Kiểm tra lỗi khi chèn vào profiles
    if (profileError) {
      console.error("Error inserting into profiles:", profileError);
      return { error: profileError.message };
    }

    // Trả về dữ liệu nếu thành công

    return data;
  } catch (error) {
    // Xử lý các lỗi không mong đợi
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
