import supabase from "@/utils/supabase";
import { v4 as uuidV4 } from "uuid";

export async function upsertFunnels({ subAccountId, funnel, funnelId }) {
  try {
    if (funnelId) {
      const { data: updatedFunnel, error: updateError } = await supabase
        .from("Funnel")
        .update({
          ...funnel,
          id: funnelId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          subAccountId: subAccountId,
        })
        .eq("id", funnelId);

      if (updateError) {
        console.error("Supabase update error:", updateError);
        return { error: updateError.message };
      }

      return updatedFunnel;
    } else {
      const { data: newFunnel, error: insertError } = await supabase
        .from("Funnel")
        .insert({
          ...funnel,
          id: uuidV4(),
          subAccountId: subAccountId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        return { error: insertError.message };
      }

      return newFunnel;
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
