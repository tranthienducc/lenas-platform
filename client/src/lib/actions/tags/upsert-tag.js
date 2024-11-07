import supabase from "@/utils/supabase";

export async function upsertTag(subaccountId, tag) {
  try {
    const { data: existingTag, error: fetchError } = await supabase
      .from("Tag")
      .select("*")
      .eq("id", tag.id)
      .eq("subAccountId", subaccountId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw new Error(`Error checking tag existence: ${fetchError.message}`);
    }

    const tagData = {
      ...tag,
      subAccountId: subaccountId,
    };

    if (existingTag) {
      const { data: updatedTag, error } = await supabase
        .from("Tag")
        .update(tagData)
        .eq("id", tag.id)
        .eq("subAccountId", subaccountId);

      if (error) {
        throw new Error(`Error updating tag ${tag.id}: ${error.message}`);
      }

      return updatedTag;
    } else {
      const { data: newTag, error } = await supabase
        .from("Tag")
        .insert(tagData);

      if (error) {
        throw new Error(`Error creating new tag: ${error.message}`);
      }

      return newTag;
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
}
