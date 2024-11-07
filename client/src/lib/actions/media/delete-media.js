import supabase from "@/utils/supabase";

export async function deleteMedia(mediaId) {
  try {
    const { data: media, error: mediaError } = await supabase
      .from("Media")
      .delete()
      .eq("id", mediaId);

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
