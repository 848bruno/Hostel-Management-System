import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComplainsService } from './complains.service';
import { CreateComplainDto } from './dto/create-complain.dto';
import { UpdateComplainDto } from './dto/update-complain.dto';

@Controller('complains')
export class ComplainsController {
  constructor(private readonly complainsService: ComplainsService) {}

  @Post()
  create(@Body() createComplainDto: CreateComplainDto) {
    return this.complainsService.create(createComplainDto);
  }

  @Get()
  findAll() {
    return this.complainsService.findAll();
  }

  @Get(':complainid')
  findOne(@Param('complainid') id: string) {
    return this.complainsService.findOne(+id);
  }

  @Patch(':complainid')
  update(
    @Param('complainid') id: string,
    @Body() updateComplainDto: UpdateComplainDto,
  ) {
    return this.complainsService.update(+id, updateComplainDto);
  }

  @Delete(':complainid')
  remove(@Param('complainid') id: string) {
    return this.complainsService.remove(+id);
  }
}
