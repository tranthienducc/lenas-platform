import supabase from "@/utils/supabase";

export async function deleteTag(tagId) {
  try {
    const { data: tags, error: tagError } = await supabase
      .from("Tag")
      .delete()
      .eq("id", tagId)

      .single();

    if (tagError) {
      console.error("Supabase error:", tagError);
      return { error: tagError.message };
    }

    return tags;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
