import supabase from "@/utils/supabase";

export async function getMedia({ subaccountId }) {
  try {
    const { data: media, error: mediaError } = await supabase
      .from("SubAccount")
      .select(
        `
      *,
      Media(*)
    `
      )
      .eq("id", subaccountId)
      .single();

    if (mediaError) {
      console.error("Supabase error:", mediaError);
      return { error: mediaError.message };
    }

    return media;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
