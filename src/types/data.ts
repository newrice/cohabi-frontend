export interface ICurrentUser {
  email: string;
  id: string;
  name: string;
  avatar: string;
  groups: IGroup[];
}

export interface ICategory {
  id: string;
  name: string;
  disabled: boolean;
}

export interface IGroupBase {
  name: string;
}

export interface IGroup extends IGroupBase {
  id: string;
}

export interface IResponseGroup extends IGroup {
  users: string[];
}

export interface IUser {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}
