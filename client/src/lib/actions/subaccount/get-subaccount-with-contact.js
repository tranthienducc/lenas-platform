import supabase from "@/utils/supabase";

export async function getSubAccountWithContact(subAccountId) {
  try {
    const { data: subAccount, error: subAccountError } = await supabase
      .from("SubAccount")
      .select(
        `
        *,
        Contact (
          *,
          Ticket (
            value
          )
        )
      `
      )
      .eq("id", subAccountId)
      .maybeSingle(); // Changed from .single() to .maybeSingle()

    if (subAccountError) {
      throw new Error(`Error fetching subaccount: ${subAccountError.message}`);
    }

    // If no data found
    if (!subAccount) {
      return { error: "SubAccount not found" };
    }

    // Sort contacts if they exist
    if (subAccount.Contact) {
      subAccount.Contact.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    return subAccount;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
