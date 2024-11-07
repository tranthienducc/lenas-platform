import supabase from "@/utils/supabase";

export async function getLandTicketAndTags({ pipelineId }) {
  try {
    // Step 1: Fetch lanes with tickets and basic relations
    const { data: lanes, error } = await supabase
      .from("Lane")
      .select(
        `
        *,
        Ticket ( 
          *,
          Assigned: profiles (
            user_id,
            email,
            firstName,
            lastName,
            profileImage
          ),
          Customer: Contact (*)
        )
      `
      )
      .eq("pipelineId", pipelineId)
      .order("order", { ascending: true });

    if (error) throw error;

    // Step 2: Get all ticket IDs
    const ticketIds = lanes?.flatMap(
      (lane) => lane?.Ticket?.map((ticket) => ticket.id) ?? []
    );

    if (ticketIds.length === 0) {
      return { data: lanes }; // No tickets, return the lanes directly
    }

    // Step 3: Fetch tags for all tickets using the junction table
    const { data: ticketTags, error: tagsError } = await supabase
      .from("_TagToTicket")
      .select(
        `
        A, 
        Tag:Tag!inner (
          id,
          name,
          color
        )
      `
      )
      .in("A", ticketIds); // 'B' is the foreign key for the ticket ID

    if (tagsError) throw tagsError;

    // Step 4: Merge the fetched tags with their respective tickets
    const lanesWithTags = lanes?.map((lane) => ({
      ...lane,
      Ticket: lane.Ticket?.map((ticket) => ({
        ...ticket,
        Tags:
          ticketTags
            ?.filter((tt) => tt.A === ticket.id) // Match by ticket ID
            .map((tt) => tt.Tag) ?? [], // Extract the actual tag details
      })),
    }));

    return { data: lanesWithTags }; // Return lanes with attached tags
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
