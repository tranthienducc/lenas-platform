import supabase from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

export async function createMedia({ subAccountId, link, name }) {
  try {
    const { data: media, error: mediaError } = await supabase
      .from("Media")
      .insert({
        id: uuidv4(),
        link: link,
        name: name,
        subAccountId: subAccountId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

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
