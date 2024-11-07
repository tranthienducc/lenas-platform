import supabase from "@/utils/supabase";

export async function deleteTicket(ticketId) {
  try {
    const { data: ticket, error: ticketError } = await supabase
      .from("Ticket")
      .delete()
      .eq("id", ticketId);

    if (ticketError) {
      console.error("Supabase error:", ticketError);
      return { error: ticketError.message };
    }

    return ticket;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
