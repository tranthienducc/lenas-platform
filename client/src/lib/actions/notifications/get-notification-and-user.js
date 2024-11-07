import supabase from "@/utils/supabase";

export async function getNotificationAndUser({ agencyId }) {
  try {
    const { data, error } = await supabase
      .from("Notification")
      .select(
        `
      *,
      User: profiles (
        user_id,
        email,
        firstName,
        lastName,
        role,
        bio,
        username,
        profileImage
      )
    `
      )
      .eq("agencyId", agencyId)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return { error: error.message };
    }

    return data; // Trả về dữ liệu từ Supabase
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
