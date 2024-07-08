export interface ILoginResponse {
  accessToken: string;
  expiresIn: number;
}

export interface IResponse<T> {
  data: T;
}

export interface IUser {
  id?: number;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  authorities?: IAuthority[];
}

export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  stockSize?: number;
  createdAt?: string;
  updatedAt?: string;
  category?: ICategory;
}

export interface IAuthority {
  authority: string;
}

export interface ICategory {
  id?: number;
  name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IFeedBackMessage {
  type?: IFeedbackStatus;
  message?: string;
}

export enum IFeedbackStatus {
  success = "SUCCESS",
  error = "ERROR",
  default = "",
}

export enum IRole {
  user = "ROLE_USER",
  superAdmin = "ROLE_SUPER_ADMIN",
}
