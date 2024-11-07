import supabase from "@/utils/supabase";

export async function getSubaccountTeamMembers(subAccountId) {
  try {
    const { data: teamMembers, error } = await supabase
      .from("profiles")
      .select(
        `
        *,
        Permissions!inner(*)
      `
      )
      .eq("role", "SUBACCOUNT_USER")
      .eq("Permissions.subAccountId", subAccountId)
      .eq("Permissions.access", true);

    if (error) {
      throw error;
    }

    return teamMembers;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
