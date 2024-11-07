import supabase from "@/utils/supabase";

export async function getAllAgency() {
  try {
    const { data: agencies, error } = await supabase.from("agency").select(`*`);

    console.log("Supabase response:", { agencies, error });
    if (error) {
      console.error("Supabase error:", error);
      throw new Error(error.message);
    }
    return agencies;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
}
