import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager'; // Use `cache-manager` typing directly
import { CreateCacheDto } from 'src/cache/dto/create-cache.dto';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async create(createCacheDto: CreateCacheDto) {
    const { key, value, ttl } = createCacheDto;

    try {
      if (ttl) {
        await this.cacheManager.set(key, value, ttl);
      } else {
        await this.cacheManager.set(key, value);
      }

      return {
        success: true,
        message: `Cache entry created successfully`,
        data: { key, value },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to create cache entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }

  async get(key: string) {
    try {
      const value = await this.cacheManager.get(key);

      // if (value === undefined || value === null) {
      //   return {
      //     success: false,
      //     message: `Cache entry with key '${key}' not found`,
      //     data: null,
      //   };
      // }

      return {
        success: true,
        message: `Cache entry retrieved successfully`,
        data: {
          key,
          value,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to retrieve cache entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }

  async remove(key: string) {
    try {
      await this.cacheManager.del(key);

      return {
        success: true,
        message: `Cache entry with key '${key}' removed successfully`,
        data: { key },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to remove cache entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }
}
