import { supbase } from "../../../utils/supbase";

export async function createUsers({
  email,
  firstName,
  lastName,
  profileImage,
}) {
  try {
    const { data, error } = await supbase.from("user").insert([
      {
        email: email,
        firstName: firstName,
        lastName: lastName,
        profileImage: profileImage,
      },
    ]);

    if (error?.code) return error;

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error.message };
  }
}
