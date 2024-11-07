import supabase from "@/utils/supabase";

export async function changeUserPermission(
  permissionId,
  userEmail,
  subAccountId,
  permission
) {
  try {
    let data, error;
    if (permissionId) {
      // Update the existing permission if permissionId is provided
      ({ data, error } = await supabase
        .from("Permissions") // Assuming 'Permissions' is the table name
        .update({ access: permission })
        .eq("id", permissionId));
    } else {
      // Insert new permission if no permissionId is provided
      ({ data, error } = await supabase.from("Permissions").insert({
        email: userEmail,
        subAccountId: subAccountId,
        access: permission,
      }));
    }

    // Check for errors in Supabase query
    if (error) {
      console.error("Supabase error:", error);
      return { error: error.message };
    }

    // Log the Supabase response for debugging
    console.log("Supabase response:", data);

    // Return the fetched data
    return data;
  } catch (error) {
    // Xử lý các lỗi không mong đợi
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
