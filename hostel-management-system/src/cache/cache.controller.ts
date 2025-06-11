import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CreateCacheDto } from './dto/create-cache.dto';

@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Post()
  create(@Body() createCacheDto: CreateCacheDto) {
    return this.cacheService.create(createCacheDto);
  }

  @Get(':key')
  get(@Param('key') key: string) {
    return this.cacheService.get(key);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.cacheService.remove(key);
  }
}
