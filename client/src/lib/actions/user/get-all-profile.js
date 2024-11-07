import supabase from "@/utils/supabase";

export default async function getAllProfile({ userId }) {
  try {
    if (!userId) {
      console.error("userId is undefined");
      return { error: "User ID is required" };
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
