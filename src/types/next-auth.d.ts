import "next-auth"
import { User as PrismaUser } from "@prisma/client"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: PrismaUser["role"]
      email: string
      name?: string
      image?: string
    } & DefaultSession["user"]
  }

  interface User extends Omit<PrismaUser, "id"> {
    id: string
    email: string
    name?: string
    image?: string
  }
}