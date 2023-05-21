import { type Request } from "express";

export interface UserCredentials {
  username: string;
  password: string;
}

export type UserLoginRequestStrucuture = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  { username: string; password: string }
>;

export interface UserStructure extends UserCredentials {
  _id: string;
  name: string;
  imgUrl: string;
  friends: string[];
  enemies: string[];
}
