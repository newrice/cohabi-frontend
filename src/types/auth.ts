export interface ICognitoUser {
  email: string;
  userId: string;
  userName: string;
}

export interface IAuthData extends ICognitoUser {
  group: string[];
  role: string;
}
