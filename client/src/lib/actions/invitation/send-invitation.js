import supabase from "@/utils/supabase";

export async function sendInvitation(role, email, agencyId) {
  try {
    const { data: invitationData, error: invitationError } = await supabase
      .from("Invitation")
      .insert({
        email: email,
        agencyId: agencyId,
        role: role,
      });

    if (invitationError) {
      console.error("Supabase error:", invitationError);
      return { error: invitationError.message };
    }

    // Sử dụng Supabase Auth API để mời người dùng qua email
    const { error: authError } =
      await supabase.auth.admin.inviteUserByEmail(email);

    if (authError) {
      console.error("Supabase Auth error:", authError);
      return { error: authError.message };
    }

    // Sau khi gửi email mời thành công
    return invitationData;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
