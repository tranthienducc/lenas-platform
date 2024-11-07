import supabase from "@/utils/supabase";

export async function searchContacts(searchTerms) {
  try {
    const { data: contacts, error } = await supabase
      .from("Contact")
      .select("*")
      .ilike("name", `%${searchTerms}%`);
    if (error) {
      console.error("Supabase error:", error);
      return { error: error.message };
    }

    return contacts;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
