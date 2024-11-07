import supabase from "@/utils/supabase";

export async function getLanesWithTicketAndTags(pipelineId) {
  try {
    const { data: lanes, error: lanesError } = await supabase
      .from("Lane")
      .select(
        `
        *,
        Tickets (
          *,
          Tags (*),
          Assigned:profiles (*),
          Customer:Contact (*)
        )
      `
      )
      .eq("pipelineId", pipelineId)
      .order("order", { ascending: true })
      .order("order", { ascending: true, foreignTable: "Tickets" });

    if (lanesError) {
      throw new Error(`Supabase error: ${lanesError.message}`);
    }

    if (!lanes) {
      return [];
    }

    // Transform the data to ensure proper structure
    const transformedLanes = lanes.map((lane) => ({
      ...lane,
      Tickets: (lane.Tickets || []).map((ticket) => ({
        ...ticket,
        Tags: ticket.Tags || [],
        Assigned: ticket.Assigned || null,
        Customer: ticket.Customer || null,
      })),
    }));

    return transformedLanes;
  } catch (error) {
    console.error("ERROR GETTING LANES WITH TICKETS:", error);
    return { error: error.message };
  }
}
