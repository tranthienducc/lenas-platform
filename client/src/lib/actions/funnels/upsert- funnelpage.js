import supabase from "@/utils/supabase";
import { v4 as uuidV4 } from "uuid";

export async function upsertFunnelPage(subAccountId, funnelPage, funnelId) {
  try {
    if (!subAccountId || !funnelId) return;

    const { data: existingPage, error: fetchError } = await supabase
      .from("FunnelPage")
      .select("*")
      .eq("id", funnelPage?.id);

    if (fetchError) {
      throw new Error(`Error fetching funnel page: ${fetchError.message}`);
    }

    let response;

    if (existingPage && existingPage.length > 0) {
      const { data, error: updateError } = await supabase
        .from("FunnelPage")
        .update({ ...funnelPage })
        .eq("id", funnelPage?.id);

      if (updateError) {
        throw new Error(`Error updating funnel page: ${updateError.message}`);
      }

      response = data;
    } else {
      const defaultContent = JSON.stringify([
        {
          content: [],
          id: "__body",
          name: "Body",
          styles: { backgroundColor: "white" },
          type: "__body",
        },
      ]);

      const { data, error: insertError } = await supabase
        .from("FunnelPage")
        .insert({
          ...funnelPage,
          id: uuidV4(),
          content: funnelPage?.content ? funnelPage?.content : defaultContent,
          funnelId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      if (insertError) {
        throw new Error(`Error creating funnel page: ${insertError.message}`);
      }
      response = data;
    }

    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
