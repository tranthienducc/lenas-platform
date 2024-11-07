import supabase from "@/utils/supabase";

export async function deleteLane(laneId) {
  try {
    const { data: lane, error: laneError } = await supabase
      .from("Lane")
      .delete()
      .eq("id", laneId);

    if (laneError) {
      console.error("Supabase error:", laneError);
      return { error: laneError.message };
    }

    return lane;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
