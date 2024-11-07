export const convertFileToUrl = (file) => URL.createObjectURL(file);

export const generateHasPassword = (length) => {
  let result = "";

  const passwordCharacters =
    "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+";

  const passwordLength = passwordCharacters.length;

  for (let index = 0; index < length; index++) {
    result += passwordCharacters.charAt(
      Math.floor(Math.random() * passwordLength)
    );
  }

  return result;
};

export function determineSidebarLogo(type, users, id, isWhiteLabelAgency) {
  // Default logo
  let sidebarLogo = "/assets/images/avatar-user.png";

  // Check if users array exists and has at least one element
  if (users && users.length > 0) {
    const user = users[0];
    isWhiteLabelAgency = user?.agency?.whiteLabel;

    if (type === "agency") {
      // For agency type, use agency logo if available
      sidebarLogo = user?.agency?.agencyLogo || sidebarLogo;
    } else if (type === "subaccount" && !isWhiteLabelAgency) {
      // For subaccount type and not white label agency
      const subAccount = user?.agency?.SubAccount?.find((sub) => sub.id === id);
      if (subAccount) {
        sidebarLogo = subAccount.subAccountLogo || sidebarLogo;
      }
    }
  }

  return sidebarLogo;
}
