import { z } from 'zod'

const envSchema = z.object({
  KIBELA_TEAM: z.string().min(1, 'KIBELA_TEAM is required'),
  KIBELA_TOKEN: z.string().min(1, 'KIBELA_TOKEN is required'),
})

export type Env = z.infer<typeof envSchema>

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

export const env = envSchema.parse(process.env)
