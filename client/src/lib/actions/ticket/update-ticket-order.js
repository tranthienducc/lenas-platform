import supabase from "@/utils/supabase";

export async function updateTicketsOrder(tickets) {
  try {
    const updatePromises = tickets.map(async (ticket) => {
      const { data, error } = await supabase
        .from("Ticket")
        .update({
          order: ticket.order,
          laneId: ticket.laneId,
        })
        .eq("id", ticket.id);

      if (error) {
        throw new Error(`Error updating ticket ${ticket.id}: ${error.message}`);
      }

      return data;
    });

    await Promise.all(updatePromises);
    console.log("🟢 Done reordered 🟢");
  } catch (error) {
    console.error(error, "🔴 ERROR UPDATE TICKET ORDER");
    return { error: error.message };
  }
}
