import supabase from "@/utils/supabase";
import { v4 } from "uuid";

export async function changeUserPermission(
  permissionId,
  userEmail,
  subAccountId,
  permission
) {
  try {
    if (permissionId) {
      const { data, error } = await supabase
        .from("Permissions")
        .update({ access: permission })
        .eq("id", permissionId);

      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase.from("Permissions").insert({
        id: v4(),
        email: userEmail,
        subAccountId: subAccountId,
        access: permission,
      });

      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
