import supabase from "@/utils/supabase";

export async function _getTicketsWithAllRelations(laneId) {
  try {
    const { data: tickets, error: ticketsError } = await supabase
      .from("Ticket")
      .select(
        `
      *,
      Assigned (*),
      Customer (*),
      Lane (*),
      Tags (*)
    `
      )
      .eq("laneId", laneId);

    if (ticketsError) {
      throw new Error(`Supabase error: ${ticketsError.message}`);
    }

    return tickets;
  } catch (error) {
    console.error(error, " ERROR UPDATE TICKET ORDER");
    return { error: error.message };
  }
}
