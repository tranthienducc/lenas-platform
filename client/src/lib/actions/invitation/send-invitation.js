import supabase from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

export async function sendInvitation(role, email, agencyId) {
  try {
    const { data: invitationData, error: invitationError } = await supabase
      .from("Invitation")
      .insert({
        id: uuidv4(),
        email: email,
        agencyId: agencyId,
        role: role,
      });

    if (invitationError) {
      console.error("Supabase error:", invitationError);
      return { error: invitationError.message };
    }

    const { error: authError } =
      await supabase.auth.admin.inviteUserByEmail(email);

    if (authError) {
      console.error("Supabase Auth error:", authError);
      return { error: authError.message };
    }

    return invitationData;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
