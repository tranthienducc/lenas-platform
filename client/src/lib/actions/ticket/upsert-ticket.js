import supabase from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

export async function upsertTicket(ticket, tags) {
  try {
    const ticketId = ticket.id || uuidv4();

    // If order is not provided, get the count of tickets in the lane
    let order = ticket.order;
    if (!order) {
      const { data: tickets } = await supabase
        .from("Ticket")
        .select("id")
        .eq("laneId", ticket.laneId);
      order = tickets?.length || 0;
    }

    // Upsert the ticket
    const { error: upsertError } = await supabase.from("Ticket").upsert({
      id: ticketId,
      name: ticket.name,
      laneId: ticket.laneId,
      order: order,
      value: ticket.value,
      description: ticket.description,
      customerId: ticket.customerId,
      assignedUserId: ticket.assignedUserId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (upsertError) throw upsertError;

    // Handle tags relationship
    if (Array.isArray(tags) && tags.length > 0) {
      // First remove all existing tag relationships
      const { error: deleteError } = await supabase
        .from("_TagToTicket")
        .delete()
        .eq("ticket_id", ticketId);

      if (deleteError) throw deleteError;

      // Then insert new tag relationships
      const tagRelations = tags.map((tag) => ({
        ticket_id: ticketId,
        tag_id: tag.id,
        A: ticketId, // Add this
        B: tag.id, // Add this
      }));

      const { error: insertError } = await supabase
        .from("_TagToTicket")
        .insert(tagRelations);

      if (insertError) throw insertError;
    }

    // Fetch and return the final ticket with all relations
    const { data: finalTicket, error: finalError } = await supabase
      .from("Ticket")
      .select(
        `
        *,
        Lane (*),
        Customer:Contact (*),
        Assigned:profiles (*),
        Tag:_TagToTicket (
          tag:Tag (*)
        )
      `
      )
      .eq("id", ticketId)
      .single();

    if (finalError) throw finalError;
    if (!finalTicket) throw new Error("Failed to fetch updated ticket");

    // Transform the response to match the expected format
    const transformedTicket = {
      ...finalTicket,
      Tags: finalTicket.Tags?.map((t) => t.tag) || [],
    };

    return transformedTicket;
  } catch (error) {
    console.error("🔴 ERROR UPDATE TICKET:", error);
    return { error: error.message };
  }
}
