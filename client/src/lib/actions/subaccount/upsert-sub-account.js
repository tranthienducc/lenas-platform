import supabase from "@/utils/supabase";
import { v4 } from "uuid";

export async function upsertSubAccount(subAccount) {
  if (!subAccount.companyEmail) return null;
  try {
    const { data: agencyOwner, error: agencyError } = await supabase
      .from("profiles")
      .select("*")
      .eq("agencyId", subAccount.agencyId)
      .eq("role", "AGENCY_OWNER")
      .single(); // Chỉ lấy một kết quả

    if (agencyError || !agencyOwner) {
      console.error("🔴Error could not find agency owner:", agencyError);
      return null;
    }

    const { data: subAccountData, error: subAccountError } = await supabase
      .from("SubAccount")
      .upsert({
        id: subAccount.id,
        ...subAccount,
      });

    if (subAccountError) {
      console.error("Supabase error:", subAccountError);
      return { error: subAccountError.message };
    }

    const permissionId = v4();
    const { error: permissionError } = await supabase
      .from("Permissions")
      .insert({
        id: permissionId,
        access: true,
        email: agencyOwner?.email,
        subAccountId: subAccount?.id,
      });

    if (permissionError) {
      console.error("Supabase error:", permissionError);
      return { error: permissionError.message };
    }

    const { error: pipelineError } = await supabase.from("Pipeline").insert({
      id: v4(),
      name: "Lead Cycle",
      subAccountId: subAccount?.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (pipelineError) {
      console.error("Supabase error:", pipelineError);
      return { error: pipelineError.message };
    }

    return subAccountData;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
