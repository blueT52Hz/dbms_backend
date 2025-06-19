import { z } from 'zod'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Define schema for environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  BACKEND_PORT: z.coerce.number().default(3000),
  BACKEND_HOST: z.string().default('http://localhost'),
  DATABASE_URL: z.string().url(),
  CLIENT_URL: z.string().url()
})

// Validate environment variables against schema
const envValidation = envSchema.safeParse(process.env)

if (!envValidation.success) {
  console.error('❌ Invalid environment variables:', envValidation.error.flatten().fieldErrors)
  throw new Error('Invalid environment variables')
}

// Extracted and validated environment variables
export const env = envValidation.data

// Type for TypeScript inference
export type EnvConfig = z.infer<typeof envSchema>
