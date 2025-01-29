import { LRUCache } from 'lru-cache'
import { NextResponse } from 'next/server'

type Options = {
  uniqueTokenPerInterval?: number
  interval?: number
}

export default function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  })

  return {
    check: (token: string, limit: number) => {
      const tokenCount = (tokenCache.get(token) as number[]) || [0]
      if (tokenCount[0] === 0) {
        tokenCache.set(token, [1])
        return { success: true }
      }
      if (tokenCount[0] >= limit) {
        return { success: false, response: new NextResponse(JSON.stringify({ error: 'Rate limit exceeded' }), { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
          },
        })}
      }
      tokenCount[0] += 1
      tokenCache.set(token, tokenCount)
      return { success: true }
    },
  }
}