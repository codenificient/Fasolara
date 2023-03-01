import { IUser } from "../models/user"

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      email: string;
      token?: string;
      addressId?: string;
      role?: string;
      teamId?: string;
      groupId?: string;
      villageId?: string;
    }
  }
}

export {};
