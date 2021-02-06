export const baseUserData = { email: "", userId: "", userName: "", group: [] };

// eslint-disable-next-line
export default (obj: any) => {
  let authData = baseUserData;
  try {
    if (obj) {
      authData = {
        email: obj.attributes.email || "",
        userId: obj.attributes.sub || "",
        userName: obj.username || "",
        group: obj.signInUserSession.idToken.payload["cognito:groups"] || [],
      };
    }
  } catch {
    authData = baseUserData;
  }
  return authData;
};
