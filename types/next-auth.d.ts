// types/next-auth.d.ts
import "next-auth";
import { DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    username: string;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      email?: string | null;
      name?: string | null;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
  }
}