import supabase from "@/utils/supabase";

export async function updateLandTicketAndTags(lanes) {
  try {
    const updatePromises = lanes.map(async (lane) => {
      const { data, error } = await supabase
        .from("Lane")
        .update({ order: lane?.order })
        .eq("id", lane?.id);

      if (error) {
        throw new Error(`Error updating lane ${lane.id}: ${error.message}`);
      }

      return data;
    });

    await Promise.all(updatePromises);
    console.log("🟢 Done reordered 🟢");
  } catch (error) {
    console.error(error, "ERROR UPDATE LANES ORDER");
    return { error: error.message };
  }
}
