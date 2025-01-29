// src/lib/env.ts
import { z } from "zod"

const envSchema = z.object({
  // Database & Auth
  DATABASE_URL: z.string().url(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(1),
  GITHUB_ID: z.string().min(1),
  GITHUB_SECRET: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  
  
  // Builder.io
  BUILDER_API_KEY: z.string().min(1),
  
  // Email
  RESEND_API_KEY: z.string().min(1),
  
  // Analytics
  NEXT_PUBLIC_GA_ID: z.string().min(1),
  
  // Printful
  PRINTFUL_TOKEN: z.string().min(1),
  
  // Stripe
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
})

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

try {
  envSchema.parse(process.env)
} catch (err) {
  if (err instanceof z.ZodError) {
    const { fieldErrors } = err.flatten()
    const errorMessage = Object.entries(fieldErrors)
      .map(([field, errors]) => `${field}: ${errors?.join(", ")}`)
      .join("\n")
    throw new Error(`Missing environment variables:\n${errorMessage}`)
  }
}

export const env = process.env as z.infer<typeof envSchema>