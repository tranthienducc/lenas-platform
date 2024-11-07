import supabase from "@/utils/supabase";

export async function getTeamMembersByAgency({ agencyId }) {
  try {
    const { data: teamMembers, error: teamError } = await supabase
      .from("profiles")
      .select("*, Permissions(*), agency(*, SubAccount(*))")
      .eq("agencyId", agencyId);

    if (teamError) {
      console.error("Error fetching team members:", teamError);
      return { error: teamError.message };
    }

    return teamMembers;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
