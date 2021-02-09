// #region Category
export interface ICategory {
  id: string;
  name: string;
  disabled: boolean;
}
// #endregion

// #region Todo
export interface ITodoBase {
  name: string;
  comment: string;
  done: boolean;
}
export interface ITodo extends ITodoBase {
  id: string;
}
// #endregion

// #region User
export interface ICurrentUser {
  email: string;
  id: string;
  name: string;
  avatar: string;
  groups: IGroup[];
}
export interface IUser {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}
// #endregion

// #region Group
export interface IGroupBase {
  name: string;
}

export interface IGroup extends IGroupBase {
  id: string;
}

export interface IResponseGroup extends IGroup {
  users: string[];
}
// #endregion
