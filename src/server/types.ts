import { type Request } from "express";

export type UserLoginRequestStrucuture = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  { username: string; password: string }
>;
