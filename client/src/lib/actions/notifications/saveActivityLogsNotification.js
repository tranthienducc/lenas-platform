import { getCurrentUser } from "@/lib/actions/user/get-current-user";
import supabase from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

export async function saveActivityLogsNotification({
  agencyId,
  description,
  subAccountId,
}) {
  try {
    const authUser = await getCurrentUser();
    let userData;

    if (!authUser) {
      const { data: userResponse, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("agencyId", agencyId)
        .single();

      if (error) throw error;
      userData = userResponse;
    } else {
      const { data: userResponse, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", authUser.email)
        .single();

      if (error) throw error;
      userData = userResponse;
    }

    if (!userData) {
      console.log("Could not find a user");
      return;
    }

    let foundAgencyId = agencyId;
    if (!foundAgencyId) {
      if (!subAccountId) {
        throw new Error(
          "You need to provide at least an agency Id or subaccount Id"
        );
      }
      const { data: subaccountResponse, error } = await supabase
        .from("SubAccount")
        .select("agencyId")
        .eq("id", subAccountId)
        .single();

      if (error) throw error;
      foundAgencyId = subaccountResponse.agencyId;
    }

    const notificationData = {
      id: uuidv4(),
      notification: `${userData.firstName || userData.lastName || "User"} | ${description}`,
      userId: userData.user_id,
      agencyId: foundAgencyId,
      ...(subAccountId && { subAccountId: subAccountId }),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { data, error } = await supabase
      .from("Notification")
      .insert([notificationData]);

    if (error) throw error;

    console.log("Notification created successfully:", data);
    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
