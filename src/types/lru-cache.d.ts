declare module 'lru-cache' {
  export class LRUCache<K, V> {
    constructor(options?: {
      max?: number
      ttl?: number
      maxSize?: number
      sizeCalculation?: (value: V, key: K) => number
    })
    set(key: K, value: V): void
    get(key: K): V | undefined
  }
} 