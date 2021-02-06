import { IUser } from "../../types";

const cognitoUserNameReg = /^[a-zA-Z0-9-_.]*$/;
const emailReg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
const passwordReg = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i;
const maxFileSize = 5000000;

export const isNameValid = (name: string): boolean => !!name;

export const isCognitoUserNameValid = (name: string): boolean => {
  const reg = new RegExp(cognitoUserNameReg);
  const res = reg.test(name);
  return res;
};

export const isEmailValid = (email: string | undefined): boolean => {
  if (!email) {
    return false;
  }
  const reg = new RegExp(emailReg);
  const res = reg.test(email);
  return res;
};

export const isPasswordValid = (password: string): boolean => {
  const reg = new RegExp(passwordReg);
  const res = reg.test(password);
  return res;
};

export const hasId = (item: IUser): boolean => Boolean(item.id);

export const isFileValid = (file: File): boolean => file.size < maxFileSize;
