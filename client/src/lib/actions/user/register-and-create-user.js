import supabase from "@/utils/supabase";

export async function registerAndCreateUser({
  email,
  password,
  agencyId,
  firstName,
  lastName,
  role,
}) {
  try {
    // Đăng ký người dùng qua Supabase Authentication
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    // Nếu có lỗi khi đăng ký, trả về lỗi
    if (signUpError) {
      console.error("Supabase sign-up error:", signUpError);
      return { error: signUpError.message };
    }

    // Nếu đăng ký thành công, tiếp tục chèn vào bảng profiles
    const userId = signUpData.user.id;

    const { data, error } = await supabase.from("profiles").insert([
      {
        user_id: userId,
        email: email,
        agencyId: agencyId,
        firstName: firstName,
        lastName: lastName,
        role: role,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Xử lý lỗi nếu có
    if (error) {
      console.error("Supabase error:", error);
      return { error: error.message };
    }

    // Trả về dữ liệu người dùng nếu thành công
    return { data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
