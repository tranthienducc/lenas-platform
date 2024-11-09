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
      .single();

    if (invitationError) {
      console.error("Invitation error:", invitationError);
      return { error: invitationError.message };
    }

    if (invitationExists) {
      const userDetails = await registerAndCreateUser({
        userId: user.id,
        agencyId: invitationExists.agencyId,
      });

      await saveActivityLogsNotification({
        agencyId: invitationExists.agencyId,
        description: "Joined",
      });

      if (userDetails) {
        const { error: updateError } = await supabase.auth.updateUser({
          data: {
            role: userDetails.role || "SUBACCOUNT_USER",
          },
        });

        if (updateError) {
          console.error("Error updating user metadata:", updateError);
          return { error: updateError.message };
        }

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
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
