type CacheItem<T> = {
    value: T
    expiry?: number
}

class Cache {
    private cacheMap: Map<string, CacheItem<unknown>> = new Map()
    private defaultTTL: number = 60 * 60 * 1000 // 1 hour in milliseconds

    public has(key: string): boolean {
        if (this.cacheMap.has(key)) {
            const item = this.cacheMap.get(key)!
            if (item.expiry && Date.now() > item.expiry) {
                this.cacheMap.delete(key)
                return false
            }
            return true
        }
        return false
    }

    public get<T>(key: string): T | undefined {
        if (this.has(key)) {
            return this.cacheMap.get(key)!.value as T
        }
        return undefined
    }

    public set<T>(key: string, value: T, ttl?: number): void {
        const expiry = Date.now() + (ttl ?? this.defaultTTL)
        this.cacheMap.set(key, { value, expiry })
    }

    public clear(): void {
        this.cacheMap.clear()
    }
}

export const cache = new Cache()
