import { builder } from '@builder.io/react'
import { env } from './env'

builder.init(env.BUILDER_API_KEY)

export const builderConfig = {
  apiKey: env.BUILDER_API_KEY,
  customComponents: []
}