import supabase from "@/utils/supabase";

export async function updatedUser(user) {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user data:", userError);
      return { error: userError.message };
    }

    const currentEmail = userData.user.email;

    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...user,
      })
      .eq("email", data?.email);

    if (data?.email !== currentEmail) {
      const { data: updateData, error: updateError } =
        await supabase.auth.updateUser({
          email: data?.email,
        });

      if (updateError) {
        console.error("Error updating email in auth:", updateError);
        return { error: updateError.message };
      }

      return updateData;
    }

    console.log("Supabase response:", { data, error });

    if (error) {
      console.error("Supabase error:", error);
      return { error: error.message };
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
