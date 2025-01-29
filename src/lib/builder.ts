import { Builder } from '@builder.io/react'
import { env } from './env'

Builder.init(env.BUILDER_API_KEY)

export const builderConfig = {
  apiKey: env.BUILDER_API_KEY,
  customComponents: []
}