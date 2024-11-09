import { getCurrentUser } from "@/lib/actions/user/get-current-user";
import supabase from "@/utils/supabase";

export async function initUser(newUser) {
  const user = await getCurrentUser();

  if (!user) return;
  try {
    const { data: userData, error } = await supabase
      .from("profiles")
      .upsert({
        user_id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: newUser.role || "SUBACCOUNT_USER",
        profileImage: user.profileImage,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .single();

    if (error) {
      throw new Error(`Failed to upsert user: ${error.message}`);
    }

    return userData;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
