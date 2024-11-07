import supabase from "@/utils/supabase";
import { v4 } from "uuid";

export async function upsertAgency(agency) {
  try {
    const agencyData = {
      id: agency.id || v4(),
      agencyLogo: agency.agencyLogo,
      name: agency.name,
      companyEmail: agency.companyEmail,
      companyPhone: agency.companyPhone,
      whiteLabel: agency.whiteLabel,
      address: agency.address,
      city: agency.city,
      state: agency.state,
      zipCode: agency.zipCode,
      goal: agency.goal,
      country: agency.country,
      connectAccountId: agency.connectAccountId,
      customerId: agency.customerId,
      createdAt: new Date(agency.createdAt),
      updatedAt: new Date(agency.updatedAt),
    };

    const { data: agencyDetails, error: agencyError } = await supabase
      .from("agency")
      .upsert(agencyData)
      .select("*")
      .single();

    if (agencyError) {
      console.error("Supabase error:", agencyError);
      return { error: agencyError.message };
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ agencyId: agencyDetails.id })
      .eq("user_id", agency.userId);

    if (profileError) {
      console.error("Error updating profiles:", profileError);
      return { error: profileError.message };
    }

    return agencyDetails;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
