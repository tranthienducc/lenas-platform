import supabase from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

export async function upsertLane(lane) {
  try {
    let order;

    // Generate a new ID if lane.id is not provided (new lane case)
    const laneId = lane.id || uuidv4();

    if (!lane?.order) {
      const { data: lanes, error: lanesError } = await supabase
        .from("Lane")
        .select("*")
        .eq("pipelineId", lane.pipelineId);

      if (lanesError) {
        throw new Error(`Error fetching lanes: ${lanesError.message}`);
      }

      order = lanes.length;
    } else {
      order = lane?.order;
    }

    const { data: response, error: upsertError } = await supabase
      .from("Lane")
      .upsert({
        ...lane,
        id: laneId, // Ensure the id is correctly passed
        order,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    if (upsertError) {
      throw new Error(`Error upserting lane: ${upsertError.message}`);
    }

    return response;
  } catch (error) {
    console.error(error, "ERROR UPDATE LANES ORDER");
    return { error: error.message };
  }
}
