import supabase from "../supabase/supabase";
import { v4 as uuidv4 } from "uuid";

export async function subscriptionCreated(subscription, customerId) {
  try {
    const { data: agency, error: agencyError } = await supabase
      .from("agency")
      .select("*")
      .eq("customerId", customerId.trim())
      .single();

    console.log("Supabase response:", { agency, agencyError });

    if (agencyError) {
      console.error("Supabase error:", agencyError);
      return { error: agencyError.message };
    }

    const data = {
      id: uuidv4(),
      active: subscription.status === "active",
      agencyId: agency.id,
      customerId,
      currentPeriodEndDate: new Date(subscription.current_period_end * 1000),
      priceId: subscription.plan?.id,
      subscritiptionId: subscription.id,
      plan: subscription.plan?.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { data: upsertedSubscription, error: upsertError } = await supabase
      .from("Subscription")
      .upsert(data, {
        onConflict: "agencyId",
      });

    if (upsertError) {
      throw new Error("Error upserting subscription: " + upsertError.message);
    }

    console.log(`🟢 Created Subscription for ${subscription.id}`);
    return upsertedSubscription;
  } catch (error) {
    console.error("🔴 Error from Create action:", error);
    return { error: error.message };
  }
}
