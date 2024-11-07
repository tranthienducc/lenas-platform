import { generateHasPassword } from "@/helper";
import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import { registerAndCreateUser } from "@/lib/actions/user/register-and-create-user";
import supabase from "@/utils/supabase";

export async function verifyUserAndAcceptInvitation() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    window.location.replace("/login");
    return;
  }
  try {
    const { data: invitationExists, error: invitationError } = await supabase
      .from("Invitation")
      .select("*")
      .eq("email", user.email)
      .eq("status", "PENDING")
      .maybeSingle();

    if (invitationError) {
      console.error("Invitation error:", invitationError);
      return { error: invitationError.message };
    }
    const hasPassword = generateHasPassword(12);

    if (invitationExists) {
      const userDetails = await registerAndCreateUser(
        invitationExists.agencyId,
        {
          email: invitationExists.email,
          password: hasPassword,
          agencyId: invitationExists.agencyId,
          avatarUrl: user.user_metadata.avatar_url,
          firstName: user.user_metadata.first_name,
          lastName: user.user_metadata.last_name,
          role: invitationExists.role,
        }
      );

      await saveActivityLogsNotification({
        agencyId: invitationExists.agencyId,
        description: "Joined",
      });

      if (userDetails) {
        // Cập nhật metadata người dùng sau khi chấp nhận lời mời
        const { error: updateError } = await supabase.auth.updateUser({
          data: {
            role: userDetails.role || "SUBACCOUNT_USER",
          },
        });

        if (updateError) {
          console.error("Error updating user metadata:", updateError);
          return { error: updateError.message };
        }

        // Xóa lời mời sau khi đã chấp nhận
        const { error: deleteError } = await supabase
          .from("Invitation")
          .delete()
          .eq("email", user.email);

        if (deleteError) {
          console.error("Error deleting invitation:", deleteError);
          return { error: deleteError.message };
        }

        return userDetails.agencyId;
      }
    } else {
      // Kiểm tra nếu người dùng đã tồn tại trong bảng profiles
      const { data: agencyData, error: agencyError } = await supabase
        .from("profiles")
        .select("agencyId")
        .eq("email", user.email)
        .single();

      if (agencyError) {
        console.error("Error fetching agency:", agencyError);
        return { error: agencyError.message };
      }

      return agencyData ? agencyData.agencyId : null;
    }
  } catch (error) {
    // Xử lý các lỗi không mong đợi
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
