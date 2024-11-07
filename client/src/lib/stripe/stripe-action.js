import { stripe } from "@/lib/stripe";
import supabase from "@/utils/supabase";

export async function subscriptionCreated(subscription, customerId) {
  try {
    // Tìm agency dựa trên customerId
    const { data: agency, error: agencyError } = await supabase
      .from("agency")
      .select("id, SubAccount.id")
      .eq("customerId", customerId)
      .single();

    if (agencyError || !agency) {
      throw new Error("Could not find an agency to upsert the subscription");
    }

    // Chuẩn bị dữ liệu cho subscription
    const subscriptionData = {
      active: subscription.status === "active",
      agencyId: agency.id,
      customerId,
      currentPeriodEndDate: new Date(subscription.current_period_end * 1000),
      priceId: subscription.plan.id, // Bỏ qua @ts-ignore
      subscriptionId: subscription.id,
      plan: subscription.plan.id,
    };

    // Kiểm tra nếu subscription đã tồn tại (bằng cách tìm agencyId), sau đó tạo mới hoặc cập nhật
    const { data: upsertedSubscription, error: upsertError } = await supabase
      .from("Subscription")
      .upsert(subscriptionData, { onConflict: ["agencyId"] });

    if (upsertError) {
      throw new Error("Failed to upsert subscription");
    }
    console.log(`🟢 Created/Updated Subscription for ${subscription.id}`);
    return upsertedSubscription;
  } catch (error) {
    console.error("🔴 Error from Create action:", error);
    return { error: error.message };
  }
}

export async function getConnectAccountProducts(stripeAccount) {
  const products = await stripe.products.list(
    {
      limit: 50,
      expand: ["data.default_price"],
    },
    { stripeAccount }
  );

  return products.data;
}
