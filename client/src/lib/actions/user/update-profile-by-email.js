import supabase from "@/utils/supabase";

export async function updatedUser({ user }) {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user data:", userError);
      return { error: userError.message };
    }

    const currentEmail = userData.user.email;

    const { data: updatedProfile, error: profileError } = await supabase
      .from("profiles")
      .update({
        ...user,
      })
      .eq("email", currentEmail)
      .select("*")
      .single();
    if (profileError) {
      console.error("Error updating profile:", profileError);
      return { error: profileError.message };
    }

    if (user.email && user.email !== currentEmail) {
      const { data: authUpdate, error: updateError } =
        await supabase.auth.updateUser({
          email: user.email,
        });

      if (updateError) {
        console.error("Error updating email in auth:", updateError);
        return { error: updateError.message };
      }

      return {
        ...updatedProfile,
        authUpdate,
      };
    }

    return updatedProfile;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
