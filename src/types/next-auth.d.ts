import "next-auth"
import { User as PrismaUser } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: PrismaUser["role"]
    } & DefaultSession["user"]
  }
  
  interface User extends PrismaUser {}
}