import supabase from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

export async function upsertContact(values) {
  try {
    // Validate required fields
    if (!values.name || !values.email) {
      throw new Error("Name and email are required");
    }

    // Prepare contact data
    const contactData = {
      id: values.id || uuidv4(),
      name: values.name,
      email: values.email,
      subAccountId: values.subAccountId,
      createdAt: values.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Perform upsert
    const { data, error } = await supabase
      .from("Contact")
      .upsert(contactData)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error in upsertContact:", error);
    throw error; // Re-throw the error to handle it in the component
  }
}
